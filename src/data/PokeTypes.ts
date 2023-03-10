import {PkMove} from "./PokeMoves";

export type PkType =
    'NORMAL' | 'FIGHTING' | 'FLYING' | 'POISON' | 'GROUND' |
    'ROCK' | 'BUG' | 'GHOST' | 'FIRE' | 'WATER' | 'GRASS' |
    'ELECTRIC' | 'PSYCHIC' | 'ICE' | 'DRAGON' | 'NONE'

export interface Stats{
    hp: number,
    atk: number,
    def: number,
    atk_spe: number,
    def_spe: number,
    spd: number,
}

export type PkMoveWithPP = PkMove & { actual_PP : number }

export interface Pokemon {
    pokedex_id: number,
    nickname: string,
    level: number,
    OT_name: string,

    base_stats : Stats,
    stats: Stats,
    IVs: Stats,
    stats_exp: Stats

    types: [PkType, PkType] | [PkType]

    current_hp: number,
    exp: number,
    xp_needed_for_next_level ?: number,
    percentage_level?: number,
    status: number,
    item: any,
    moves: PkMoveWithPP[],
    OT_id: number,
}
