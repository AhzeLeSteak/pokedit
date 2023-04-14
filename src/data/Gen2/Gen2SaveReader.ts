import {bytes_in_poke_g2, PokemonGen2} from "./PokemonGen2";
import {SaveReaderOffset} from "../SaveReaderOffset";
import {Location} from "../types/location";
import {Pokemon} from "../types/pokemon";
import {TYPES_G2} from "./static-data/types";
import {Language, Version} from "../../firebase/types";
import {OFFSET_GOLD_EN} from "./static-data/OFFSET_G2";
import {BASE_STATS_G2_5} from "../static-data/base_stats_g2_5";

export class Gen2SaveReader extends SaveReaderOffset<PokemonGen2>{

    constructor(buffer: Uint8Array, language: Language, version: Version) {
        super(get_offset(language, version), bytes_in_poke_g2, 251, buffer, language);
    }


    protected convert_poke(poke: PokemonGen2, nickname: string, OT_name: string, location: Location["location"]): Pokemon {

        return {
            IVs: {
                atk: poke.atk,
                def: poke.def,
                spd: poke.spd,
                atk_spe: poke.atk_spe,
                def_spe: poke.def_spe,
                hp: poke.maxHP
            },
            OT_id: poke.OG_trainer_ID,
            OT_name,
            base_stats: BASE_STATS_G2_5[poke.species-1],
            current_hp: 0,
            exp: poke.exp,
            item: poke.item,
            level: poke.level,
            moves: [],
            nickname: nickname,
            pokedex_id: poke.species-1,
            stats: {
                atk: poke.atk,
                def: poke.def,
                spd: poke.spd,
                atk_spe: poke.atk_spe,
                def_spe: poke.def_spe,
                hp: poke.maxHP
            },
            stats_exp: {
                atk: poke.atk,
                def: poke.def,
                spd: poke.spd,
                atk_spe: poke.atk_spe,
                def_spe: poke.def_spe,
                hp: poke.maxHP
            },
            status: 0,
            types: TYPES_G2[poke.species-1]
        };
    }

    protected dex_id(poke: PokemonGen2): number {
        return 0;
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
