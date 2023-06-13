import {bytes_in_poke_g2, PokemonGen2} from "./PokemonGen2";
import {SaveReaderOffset} from "../SaveReaderOffset";
import {Location} from "../types/location";
import {PkMoveWithPP, Pokemon, Stats} from "../types/pokemon";
import {TYPES_G2} from "./static-data/types";
import {Language, Version} from "../../firebase/types";
import {OFFSET_GOLD_EN} from "./static-data/OFFSET_G2";
import {BASE_STATS_G2_5} from "../static-data/base_stats_g2_5";
import {MOVES_G2} from "./static-data/moves";

export class Gen2SaveReader extends SaveReaderOffset<PokemonGen2>{

    box_size: number;

    constructor(buffer: Uint8Array, language: Language, version: Version) {
        super(get_offset(language, version), bytes_in_poke_g2, 251, buffer, language);
        this.box_size = language === 'JP' ? 30 : 20;
    }


    protected convert_poke(pk_g2: PokemonGen2, nickname: string, OT_name: string, location: Location["location"]): Pokemon {
        const IVs = this.parse_IVs(pk_g2.IV);
        const moves = [pk_g2.move1, pk_g2.move2, pk_g2.move3, pk_g2.move4];
        const PPs = [pk_g2.move1PP, pk_g2.move2PP, pk_g2.move3PP, pk_g2.move4PP];

        return {
            is_egg: pk_g2.species === 0xFD,
            is_shiny: this.is_shiny(IVs),
            IVs,
            OT_id: pk_g2.OG_trainer_ID,
            OT_name,
            base_stats: BASE_STATS_G2_5[pk_g2.species - 1],
            current_hp: pk_g2.currentHp,
            exp: pk_g2.exp,
            item: pk_g2.item,
            level: pk_g2.level,
            moves: moves.reduce((acc, moveIndex, i) => MOVES_G2[moveIndex] ? [...acc, {...MOVES_G2[moveIndex], actual_PP: PPs[i]}] : acc, [] as PkMoveWithPP[]),
            nickname: nickname,
            pokedex_id: this.dex_id(pk_g2),
            stats: {
                atk: pk_g2.atk,
                def: pk_g2.def,
                spd: pk_g2.spd,
                atk_spe: pk_g2.atk_spe,
                def_spe: pk_g2.def_spe,
                hp: pk_g2.maxHP
            },
            stats_exp: {
                atk: pk_g2.ATK_EV,
                def: pk_g2.DEF_EV,
                spd: pk_g2.SPD_EV,
                atk_spe: pk_g2.SPE_EV,
                def_spe: pk_g2.SPE_EV,
                hp: pk_g2.EV_HP
            },
            status: 0,
            types: TYPES_G2[pk_g2.species - 1]
        };
    }

    protected dex_id(poke: PokemonGen2): number {
        return poke.species;
    }

    private is_shiny(IVs: Stats) {
        return [2, 3, 6, 7, 10, 11, 14, 15].includes(IVs.atk)
            && IVs.def === 10
            && IVs.atk_spe === 10
            && IVs.spd === 10;
    }

    protected set_from_location(l: Location, poke: PokemonGen2, b: boolean): void {
    }
}

const get_offset = (l: Language, v: Version) => {
    if(l === 'JP'){

    }
    else{
        if(v === 'cristal'){

        }
        else
            return OFFSET_GOLD_EN
    }
    return OFFSET_GOLD_EN
}
