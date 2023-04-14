import {Move} from "./move";
import {Type} from "./pokemon_types";

export interface Stats{
    hp: number,
    atk: number,
    def: number,
    atk_spe: number,
    def_spe: number,
    spd: number,
}

export type PkMoveWithPP = Move & { actual_PP : number }


export interface Pokemon {
    pokedex_id: number,
    nickname: string,
    level: number,
    OT_name: string,

    base_stats : Stats,
    stats: Stats,
    IVs: Stats,
    stats_exp: Stats

    types: [Type, Type] | [Type]

    current_hp: number,
    exp: number,
    xp_needed_for_next_level ?: number,
    percentage_level?: number,
    status: number,
    item: any,
    moves: PkMoveWithPP[],
    OT_id: number,
}
