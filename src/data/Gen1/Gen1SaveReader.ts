import {write_n_bytes, write_string} from "../read_buffer";
import {bytes_in_poke_g1, PokemonGen1} from "./PokemonGen1";
import {SPECIES} from "./static-data/species";
import {moves_g1} from "./static-data/moves";
import {BASE_STATS_G1} from "../static-data/base_stats_g1";
import {OFFSET_G1} from "./static-data/OFFSET_G1";
import {TYPES} from "./static-data/types";
import {SaveReaderOffset} from "../SaveReaderOffset";
import {PkMoveWithPP, Pokemon} from "../types/pokemon";
import {Location} from "../types/location";
import {Language} from "../../firebase/types";

type PkG1WithNames = PokemonGen1 & {nickname: string, OT_name: string}

export class Gen1SaveReader extends SaveReaderOffset<PokemonGen1>{

    box_size = 20;

    constructor(buffer: Uint8Array, language: Language) {
        super(OFFSET_G1, bytes_in_poke_g1, 151, buffer, language);
    }

    override get_boxes_info(): Pokemon[][] {
        const box_has_changed = this.buffer[OFFSET_G1.CURRENT_BOX_NUMBER] & 2**7;
        return Array(12)
            .fill(0)
            .map((_, i) => !box_has_changed && i > 0 ? [] : this.get_box_info(i));
    }

    override convert_poke(poke: PokemonGen1, nickname: string, OT_name: string, location: Location['location']) : Pokemon {
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

        const base_stats_g1 = BASE_STATS_G1[dex_id];

        const pokemon: Pokemon = {
            is_egg: false,
            is_shiny: false,
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
            IVs: this.parse_IVs(poke.IV),
            OT_id: 0,
            stats: {
                hp: poke.maxHP,
                atk: poke.atk,
                def: poke.def,
                atk_spe: poke.spe,
                def_spe: poke.spe,
                spd: poke.spd
            },
            base_stats: {
                ...base_stats_g1,
                atk_spe: base_stats_g1.spe,
                def_spe: base_stats_g1.spe,
            },
            current_hp: poke.currentHp,
            exp: poke.exp,
            item: undefined,
            level: location === 'box' ? poke.level : poke.level_doublon,
            moves,
            pokedex_id: dex_id,
            status: 0,
            types
        };
        return pokemon;
    }




    override set_from_location(l: Location, poke: PkG1WithNames, calc_stats = false){
        const [offset_poke, species_offset, offset_nickname, offset_OT_name] = this.get_offsets(l);
        if(calc_stats && l.location === 'party'){
            //calcul des stats
            const p = this.convert_poke(poke, '', '', 'box');
            const {stats, level} = p;
            poke.level = poke.level_doublon = level;
            poke.atk = stats.atk;
            poke.def = stats.def;
            poke.spd = stats.spd;
            poke.spe = stats.atk_spe;
            poke.maxHP = stats.hp;
        }

        let buffer_offset = 0;
        let key: keyof PokemonGen1;
        for(key in bytes_in_poke_g1){
            const bytes = bytes_in_poke_g1[key];
            write_n_bytes(this.buffer, offset_poke + buffer_offset, bytes, poke[key]);
            buffer_offset += bytes;
            if(l.location === 'box' && buffer_offset === 33)
                break;
        }
        write_string(this.buffer, offset_nickname, poke.nickname, this.language, this.offset.MEMORY_SIZE.STRING_LENGTH);
        write_string(this.buffer, offset_OT_name, poke.OT_name, this.language, this.offset.MEMORY_SIZE.STRING_LENGTH);
        write_n_bytes(this.buffer, species_offset, 1, poke.species);
    }


    override dex_id(poke: PokemonGen1): number {
        return SPECIES[poke.species];
    }

    override update(){
        const get_checksum = (offset: number, end: number) =>
            0xFF & ~this.buffer.slice(offset, end)
                .reduce((acc, val) => acc + val, 0);

        //main data checksum
        const main_checksum = get_checksum(OFFSET_G1.PLAYER_NAME, OFFSET_G1.CHECKSUM.MAIN_DATA - 1);
        write_n_bytes(this.buffer, OFFSET_G1.CHECKSUM.MAIN_DATA, 1, main_checksum);

        const write_bank_offset = (bank_offset: number, checksum_offset: number) => {
            const all_checksum = get_checksum(bank_offset, checksum_offset);
            write_n_bytes(this.buffer, checksum_offset, 1, all_checksum);
            Array(6).fill(0)
                .map((_, i) => bank_offset + this.offset.MEMORY_SIZE.BOX * i)
                .forEach((box_offset, i) => {
                    const individual_checksum_offset = checksum_offset + 0x1 + i;
                    const individual_checksum = get_checksum(box_offset, box_offset + this.offset.MEMORY_SIZE.BOX)
                    write_n_bytes(this.buffer, individual_checksum_offset, 1, individual_checksum);
                })
        }

        write_bank_offset(OFFSET_G1.BOX.BOX_1, OFFSET_G1.CHECKSUM.BANK_2);
        write_bank_offset(OFFSET_G1.BOX.BOX_7, OFFSET_G1.CHECKSUM.BANK_3);
        super.update();
    }


}
