import {read_n_bytes, read_string, write_n_bytes, write_string} from "../read_buffer";
import {PokemonGen1} from "./PokemonGen1";
import {SPECIES} from "./static-data/species";
import {SaveReader} from "../SaveReader";
import {Location, PkMoveWithPP, Pokemon, Stats} from "../PokeTypes";
import {moves_g1} from "./moves";
import {BASE_STATS} from "./static-data/base-stats";
import {calcNextXp} from "../xp-curves";
import {MEMORY_SIZE, OFFSET} from "./static-data/offset";
import {TYPES} from "./static-data/types";

type PkG1WithNames = PokemonGen1 & {nickname: string, OT_name: string}

export class Gen1SaveReader extends SaveReader<PokemonGen1>{

    calc_save_data () {
        const box_has_changed = this.buffer[OFFSET.CURRENT_BOX_NUMBER] & 2**7;
        const dex_seen = this.get_dex_data(OFFSET.POKEDEX.SEEN);
        const dex_owned = this.get_dex_data(OFFSET.POKEDEX.OWNED);

        return {
            player_name: read_string(this.buffer, OFFSET.PLAYER_NAME, this.language),
            rival_name: read_string(this.buffer, OFFSET.RIVAL_NAME, this.language),
            party: this.get_party_info(),
            boxes: Array(12)
                .fill(0)
                .map((_, i) => !box_has_changed && i > 0 ? [] : this.get_box_info(i)),
            box_size: 20,
            pokedex: dex_seen.map((seen, i) => ({
                seen,
                owned: dex_owned[i]
            }))
        }
    }

    private get_box_info(box_index: number) {
        const box_offset = this.get_box_offset(box_index);
        const poke_count = this.buffer[box_offset];

        return Array(poke_count).fill(0)
            .map((_, i) => (<Location>{location: 'box', box_index, pk_index: i}))
            .map(l => ({l, pk: this.get_from_location(l)}) )
            .map(({l, pk}) => this.convert_poke(pk, pk.nickname, pk.OT_name, l))
    }

    private get_party_info(): Pokemon[] {
        const poke_count = this.buffer[OFFSET.PARTY.OFFSET];
        return Array(poke_count).fill(0)
            .map((_, i) => (<Location>{location: 'party', pk_index: i}))
            .map(l => ({l, pk: this.get_from_location(l)}) )
            .map(({l, pk}) => this.convert_poke(pk, pk.nickname, pk.OT_name, l))
    }

    override set_box_pokes(box_index: number, pokes: PokemonGen1[]){
        super.set_box_pokes(box_index, pokes);
        const box_offset = this.get_box_offset(box_index);
        this.buffer[box_offset] = pokes.length;
        for(let i = pokes.length; i < this.save.box_size; i++)
            this.buffer[box_offset + OFFSET.BOX.SPECIES + i] = 0;
    }

    private get_box_offset(box_index: number){
        let current_box_number = this.buffer[OFFSET.CURRENT_BOX_NUMBER] % 2**7;
        return current_box_number === box_index
            ? OFFSET.CURRENT_BOX
            : box_index < 6
                ? OFFSET.BOX.BOX_1 + box_index * MEMORY_SIZE.BOX
                : OFFSET.BOX.BOX_7 + (box_index-6) * MEMORY_SIZE.BOX;
    }

    private get_offsets(l: Location){
        if(l.location === 'party')
            return [
                OFFSET.PARTY.OFFSET + OFFSET.PARTY.POKEMONS + l.pk_index * MEMORY_SIZE.POKEMON_IN_PARTY,
                OFFSET.PARTY.OFFSET + OFFSET.PARTY.POKEMON_NAMES + l.pk_index * MEMORY_SIZE.STRING_LENGTH,
                OFFSET.PARTY.OFFSET + OFFSET.PARTY.OT_NAMES + l.pk_index * MEMORY_SIZE.STRING_LENGTH
            ]

        const box_offset = this.get_box_offset(l.box_index);
        return [
            box_offset + OFFSET.BOX.POKEMONS + l.pk_index * MEMORY_SIZE.POKEMON_IN_BOX,
            box_offset + OFFSET.BOX.POKEMON_NAMES + l.pk_index * MEMORY_SIZE.STRING_LENGTH,
            box_offset + OFFSET.BOX.OT_NAMES + l.pk_index * MEMORY_SIZE.STRING_LENGTH
        ]
    }


    private get_poke_from_offset(offset: number) {
        const poke = {...bytes_in_poke};
        let key: keyof PokemonGen1;
        for(key in poke){
            const bytes = poke[key];
            poke[key] = read_n_bytes(this.buffer, offset, bytes);
            offset += bytes;
        }

        return poke;
    };


    private convert_poke(poke: PokemonGen1, nickname: string, OT_name: string, location: Location) : Pokemon {
        const move_indexes = [poke.move1, poke.move2, poke.move3, poke.move4];
        const move_PPs = [poke.move1PP, poke.move2PP, poke.move3PP, poke.move4PP];
        const moves: PkMoveWithPP[] = [];

        for(let i = 0; i < 4; i++){
            const move = moves_g1[move_indexes[i]-1];
            if(!move) break;
            moves.push({
                ...move,
                actual_PP: move_PPs[i]
            })
        }

        const dex_id = this.dex_id(poke);

        const types : Pokemon["types"] = [TYPES[poke.type1], TYPES[poke.type2]];
        if(!types[1] || types[1] === types[0])
            types.pop();

        const pokemon: Pokemon = {
            OT_name,
            nickname,
            stats_exp: {
                hp: poke.EV_HP,
                atk: poke.ATK_EV,
                def: poke.DEF_EV,
                atk_spe: poke.SPE_EV,
                def_spe: poke.SPE_EV,
                spd: poke.SPD_EV
            },
            IVs: (() => {
                const ATK_IV = poke.IV >> 12
                const DEF_IV = (poke.IV >> 8) & 15;
                const SPD_IV = (poke.IV >> 4) & 15;
                const SPE_IV = (poke.IV >> 0) & 15;
                let HP_IV =
                    (ATK_IV & 1) * 8 +
                    (DEF_IV & 1) * 4 +
                    (SPD_IV & 1) * 2 +
                    (SPE_IV & 1);

                return {
                    hp: HP_IV,
                    atk: ATK_IV,
                    atk_spe: SPE_IV,
                    def: DEF_IV,
                    def_spe: SPE_IV,
                    spd: SPD_IV
                }
            })(),
            OT_id: 0,
            stats: {
                hp: poke.maxHP,
                atk: poke.atk,
                def: poke.def,
                atk_spe: poke.spe,
                def_spe: poke.spe,
                spd: poke.spd
            },
            base_stats: BASE_STATS[dex_id],
            current_hp: poke.currentHp,
            exp: poke.exp,
            item: undefined,
            level: location.location === 'box' ? poke.level : poke.level_doublon,
            moves,
            pokedex_id: dex_id,
            status: 0,
            types
        };
        calcNextXp(pokemon);
        if(location.location === 'box')
            this.box_trick(pokemon);
        return pokemon;
    }

    private box_trick(poke: Pokemon) {
        const calc_stat = (base: number, IV: number, stat_xp: number) =>
            Math.floor((((base + IV)*2+(Math.sqrt(stat_xp)/4))*poke.level)/100)+ 5;

        (Object.keys(poke.stats) as Array<keyof Stats>).forEach((stat) => {
            poke.stats[stat] = calc_stat(poke.base_stats[stat], poke.IVs[stat], poke.stats_exp[stat]);
        })
        poke.stats.hp += poke.level + 5;
    }

    private get_dex_data(offset: number) {
        return new Array(151).fill(0)
            .map((_, i) => (this.buffer[offset + (i >> 3)] >> (i & 7) ) & 1)
            .map(val => !!val)
    }




    override get_from_location(l: Location): PkG1WithNames{
        const [offset_pk, offset_nickname, offset_OT_name] = this.get_offsets(l);
        const nickname = read_string(this.buffer, offset_nickname, this.language);
        const OT_name =  read_string(this.buffer, offset_OT_name, this.language);
        return {
            ...this.get_poke_from_offset(offset_pk),
            nickname,
            OT_name
        }
    }

    override set_from_location(l: Location, poke: PkG1WithNames){
        const [offset_poke, offset_nickname, offset_OT_name] = this.get_offsets(l);
        let buffer_offset = 0;
        let key: keyof PokemonGen1;
        for(key in bytes_in_poke){
            const bytes = bytes_in_poke[key];
            write_n_bytes(this.buffer, offset_poke + buffer_offset, bytes, poke[key]);
            buffer_offset += bytes;
            if(l.location === 'box' && buffer_offset === 33)
                break;
        }
        write_string(this.buffer, offset_nickname, poke.nickname, this.language);
        write_string(this.buffer, offset_OT_name, poke.OT_name, this.language);
        const species_offset = l.location === 'party' ? OFFSET.PARTY.OFFSET : this.get_box_offset(l.box_index);
        write_n_bytes(this.buffer, species_offset + 1 + l.pk_index, 1, poke.species)
    }


    override dex_id(poke: PokemonGen1): number {
        return SPECIES[poke.species];
    }

    override update(){
        const get_checksum = (offset: number, end: number) =>
            0xFF & ~this.buffer.slice(offset, end)
                .reduce((acc, val) => acc + val, 0);

        //main data checksum
        const main_checksum = get_checksum(OFFSET.PLAYER_NAME, OFFSET.CHECKSUM.MAIN_DATA - 1);
        write_n_bytes(this.buffer, OFFSET.CHECKSUM.MAIN_DATA, 1, main_checksum);

        const write_bank_offset = (bank_offset: number, checksum_offset: number) => {
            const all_checksum = get_checksum(bank_offset, checksum_offset);
            write_n_bytes(this.buffer, checksum_offset, 1, all_checksum);
            Array(6).fill(0)
                .map((_, i) => bank_offset + MEMORY_SIZE.BOX * i)
                .forEach((box_offset, i) => {
                    const individual_checksum_offset = checksum_offset + 0x1 + i;
                    const individual_checksum = get_checksum(box_offset, box_offset + MEMORY_SIZE.BOX)
                    write_n_bytes(this.buffer, individual_checksum_offset, 1, individual_checksum);
                })
        }

        write_bank_offset(OFFSET.BOX.BOX_1, OFFSET.CHECKSUM.BANK_2);
        write_bank_offset(OFFSET.BOX.BOX_7, OFFSET.CHECKSUM.BANK_3);


        super.update();
    }

    change_size(l: Location, diff: number): void {
        const offset = l.location === 'box' ? this.get_box_offset(l.box_index) : OFFSET.PARTY.OFFSET;
        this.buffer[offset] += diff;
    }
}


const bytes_in_poke: PokemonGen1 = {
    species: 1,
    currentHp: 2,
    level: 1,
    status: 1,
    type1: 1,
    type2: 1,
    item: 1,
    move1: 1,
    move2: 1,
    move3: 1,
    move4: 1,
    OGTrainerID: 2,
    exp: 3,
    EV_HP: 2,
    ATK_EV: 2,
    DEF_EV: 2,
    SPD_EV: 2,
    SPE_EV: 2,
    IV: 2,
    move1PP: 1,
    move2PP: 1,
    move3PP: 1,
    move4PP: 1,
    level_doublon: 1,
    maxHP: 2,
    atk: 2,
    def: 2,
    spd: 2,
    spe: 2
}
Object.freeze(bytes_in_poke);
