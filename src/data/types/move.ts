import {Type} from "./pokemon_types";

export enum MoveCategory{
    PHYSICAL,
    SPECIAL,
    STATUS
}

export type Move = {
    name: string,
    type: Type | '???',
    category ?: MoveCategory,
    power: number | '—',
    accuracy : number | '—' | '∞',
    PP: number | '—',
    effect ?: string
}
