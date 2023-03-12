import {read_n_bytes, read_string} from "./read_buffer";
import {PokemonGen1Structure} from "./PokemonGen1Structure";
import {MEMORY_SIZE, OFFSET, SPECIES, TYPES} from "./static-data";
import {AbstractSaveDataReader} from "../AbstractSaveDataReader";
import {PkMoveWithPP, Pokemon, Stats} from "../PokeTypes";
import {moves_g1} from "./moves";
import {BASE_STATS} from "./base-stats";
import {calcNextXp} from "../xp-curves";


export class Gen1SaveDataReader extends AbstractSaveDataReader{

    constructor(private buffer: Uint8Array) {
        super();
    }



    get_save_data () {
        const box_has_changed = this.buffer[OFFSET.CURRENT_BOX_NUMBER] & 2**7;
        const dex_seen = this.get_dex_data(OFFSET.POKEDEX.SEEN);
        const dex_owned = this.get_dex_data(OFFSET.POKEDEX.OWNED);

        return {
            player_name: read_string(this.buffer, OFFSET.PLAYER_NAME),
            rival_name: read_string(this.buffer, OFFSET.RIVAL_NAME),
            party: this.get_party_info(),
            boxes: Array(12)
                .fill(0)
                .map((_, i) => !box_has_changed && i > 0 ? [] : this.get_box_info(i)),
            pokedex: dex_seen.map((seen, i) => ({
                seen,
                owned: dex_owned[i]
            }))
        }
    }

    private get_box_info(box_index: number) {
        let current_box_number = this.buffer[OFFSET.CURRENT_BOX_NUMBER] % 2**7;
        console.log(current_box_number);
        let box_offset = current_box_number === box_index
            ? OFFSET.CURRENT_BOX
            : box_index < 6
                ? OFFSET.BOX.BOX_1 + box_index * MEMORY_SIZE.BOX
                : OFFSET.BOX.BOX_7 + (box_index-6) * MEMORY_SIZE.BOX;

        const first_pk_offset = box_offset + OFFSET.BOX.POKEMONS;
        const poke_count = this.buffer[box_offset];

        return Array(poke_count).fill(0).map((_, i) => {
            const pokeG1 = this.get_poke(first_pk_offset + i * MEMORY_SIZE.POKEMON_IN_BOX);
            const nickname = read_string(this.buffer, box_offset + OFFSET.BOX.POKEMON_NAMES + i * MEMORY_SIZE.STRING_LENGTH);
            const OT_name =  read_string(this.buffer, box_offset + OFFSET.BOX.OT_NAMES + i * MEMORY_SIZE.STRING_LENGTH);
            const poke = this.convert_poke(pokeG1, nickname, OT_name, true);
            this.box_trick(poke);
            return poke;
        });
    }

    private get_party_info(): Pokemon[] {
        const poke_count = this.buffer[OFFSET.PARTY.OFFSET];
        return Array(poke_count).fill(0)
            .map((_, i) => this.get_poke(OFFSET.PARTY.OFFSET + OFFSET.PARTY.POKEMONS + i * MEMORY_SIZE.POKEMON_IN_PARTY))
            .map((pkg1, i) => {
                const nickname = read_string(this.buffer, OFFSET.PARTY.OFFSET + OFFSET.PARTY.POKEMON_NAMES + i * MEMORY_SIZE.STRING_LENGTH);
                const OT_name =  read_string(this.buffer, OFFSET.PARTY.OFFSET + OFFSET.PARTY.OT_NAMES + i * MEMORY_SIZE.STRING_LENGTH);
                return this.convert_poke(pkg1, nickname, OT_name, false);
            })
    }


    private get_poke(offset: number) {
        //number of byte for each stat
        const poke: PokemonGen1Structure = {
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
        };

        let key: keyof PokemonGen1Structure;
        for(key in poke){
            const bytes = poke[key];
            poke[key] = read_n_bytes(this.buffer, offset, bytes);
            offset += bytes;
        }

        return poke;
    };


    private convert_poke(poke: PokemonGen1Structure, nickname: string, OT_name: string, from_box: boolean) : Pokemon {

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

        const dex_id = SPECIES[poke.species];

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
            IVs: this.get_poke_IVs(poke.IV),
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
            level: from_box ? poke.level : poke.level_doublon,
            moves,
            pokedex_id: dex_id,
            status: 0,
            types
        };
        calcNextXp(pokemon);
        return pokemon;
    }

    private get_poke_IVs(IV: number): Stats {
        const ATK_IV = IV >> 12
        const DEF_IV = (IV >> 8) & 15;
        const SPD_IV = (IV >> 4) & 15;
        const SPE_IV = (IV >> 0) & 15;
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
    }

    private box_trick(poke: Pokemon) {
        const calc_stat = (base: number, IV: number, stat_xp: number) =>
            Math.floor((((base + IV)*2+(Math.sqrt(stat_xp)/4))*poke.level)/100)+ 5;

        Object.keys(poke.stats).forEach((stat_str: string) => {
            const stat = stat_str as keyof Stats;
            poke.stats[stat] = calc_stat(poke.base_stats[stat], poke.IVs[stat], poke.stats_exp[stat]);
        })
        poke.stats.hp += poke.level + 5;
    }

    private get_dex_data(offset: number) {
        return new Array(151).fill(0)
            .map((_, i) => (this.buffer[offset + (i >> 3)] >> (i & 7) ) & 1)
            .map(val => !!val)
    }
}
