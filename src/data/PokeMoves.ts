//ALL moves names in index order
import {PkType} from "./PokeTypes";


export enum PkMoveCategory{
    PHYSICAL,
    SPECIAL,
    STATUS
}

export type PkMove = {
    name: string,
    type: PkType,
    category ?: PkMoveCategory,
    power: number | '—',
    accuracy : number | '—' | '∞',
    PP: number | '—',
    effect ?: string
}
