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
    OT_name: string,
    nickname: string,
    pokedex_id: number,
    base_stats: Stats
    level: number,
    types: [PkType, PkType] | [PkType]
    currentHp: number,
    status: number,
    item: any,
    moves: PkMoveWithPP[],
    OGTrainerID: number,
    exp: number,
    EV: Stats
    IV: number,
}