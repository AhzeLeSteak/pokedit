export interface Stats{
    hp: number,
    atk: number,
    def: number,
    atk_spe: number,
    def_spe: number,
    spd: number,
}

export interface Pokemon {
    pokedex_id: number,
    base_stats: Stats
    level: number,
    types: [PkType, PkType] | [PkType]
    currentHp: number,
    status: number,
    item: any,
    moves: [PkMove, PkMove, PkMove, PkMove],
    OGTrainerID: number,
    exp: number,
    EV: Stats
    IV: number,
}

export type PkMove = {
    move_name: string,
    type: PkType,
    actual_pp: number,
    max_pp: number
} | undefined

export type PkType =
    'NORMAL' | 'FIGHTING' | 'FLYING' | 'POISON' | 'GROUND' |
    'ROCK' | 'BUG' | 'GHOST' | 'FIRE' | 'WATER' | 'GRASS' |
    'ELECTRIC' | 'PSYCHIC' | 'ICE' | 'DRAGON' | 'NONE'
