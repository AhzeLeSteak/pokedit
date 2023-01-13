import {Pokemon} from "./PokeTypes";

type Curve = 'f' | 'mf' | 'ms' | 's' | 'e' | 'fl';

const calcFast = (poke: Pokemon) => poke.next_exp = .8 * poke.level**3;
const calcMediumFast = (poke: Pokemon) => poke.next_exp = poke.level**3;
const calcMediumSlow = (poke: Pokemon) => poke.next_exp = 1.2 * poke.level**3 - 15*poke.level**2 + 100*poke.level - 140;
const calcSlow = (poke: Pokemon) => poke.next_exp = 1.25 * poke.level**3;

const funcs : Record<Curve, (p: Pokemon) => number> = {
    e(p: Pokemon): number {
        return 0;
    }, fl(p: Pokemon): number {
        return 0;
    },
    f: calcFast,
    mf: calcMediumFast,
    ms: calcMediumSlow,
    s: calcSlow
}


export function calcNextXp(poke: Pokemon) {
    const type = xp_curves[poke.pokedex_id-1];
    poke.level++;
    funcs[type](poke);
    poke.level--;
    if(poke.level === 0)
        console.log(poke);
}



const xp_curves: Curve[] = [
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "f",
    "f",
    "mf",
    "mf",
    "f",
    "f",
    "mf",
    "mf",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "s",
    "s",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "s",
    "s",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "s",
    "s",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "s",
    "s",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "s",
    "s",
    "f",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "s",
    "s",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "s",
    "s",
    "s",
    "s",
    "s",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "mf",
    "mf",
    "f",
    "f",
    "f",
    "f",
    "mf",
    "s",
    "s",
    "mf",
    "f",
    "f",
    "f",
    "f",
    "mf",
    "mf",
    "ms",
    "ms",
    "ms",
    "ms",
    "f",
    "f",
    "mf",
    "ms",
    "ms",
    "ms",
    "ms",
    "f",
    "ms",
    "ms",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "ms",
    "mf",
    "f",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "ms",
    "mf",
    "f",
    "f",
    "mf",
    "mf",
    "ms",
    "s",
    "ms",
    "mf",
    "mf",
    "mf",
    "mf",
    "s",
    "s",
    "f",
    "mf",
    "mf",
    "f",
    "s",
    "s",
    "s",
    "s",
    "mf",
    "mf",
    "mf",
    "mf",
    "s",
    "f",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "s",
    "f",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "s",
    "s",
    "s",
    "mf",
    "mf",
    "fl",
    "fl",
    "s",
    "s",
    "s",
    "e",
    "e",
    "e",
    "ms",
    "ms",
    "ms",
    "fl",
    "fl",
    "f",
    "mf",
    "f",
    "f",
    "ms",
    "f",
    "s",
    "s",
    "s",
    "mf",
    "mf",
    "s",
    "s",
    "mf",
    "mf",
    "e",
    "fl",
    "ms",
    "fl",
    "fl",
    "s",
    "s",
    "fl",
    "fl",
    "mf",
    "mf",
    "mf",
    "f",
    "f",
    "f",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "e",
    "e",
    "e",
    "fl",
    "f",
    "f",
    "mf",
    "mf",
    "fl",
    "fl",
    "mf",
    "mf",
    "e",
    "e",
    "e",
    "e",
    "e",
    "e",
    "mf",
    "ms",
    "f",
    "f",
    "f",
    "f",
    "s",
    "f",
    "ms",
    "mf",
    "mf",
    "mf",
    "ms",
    "ms",
    "ms",
    "e",
    "e",
    "e",
    "s",
    "f",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "e",
    "e",
    "e",
    "e",
    "mf",
    "mf",
    "mf",
    "ms",
    "ms",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "f",
    "fl",
    "fl",
    "mf",
    "mf",
    "f",
    "ms",
    "f",
    "f",
    "f",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "f",
    "ms",
    "mf",
    "s",
    "s",
    "s",
    "s",
    "ms",
    "ms",
    "s",
    "s",
    "s",
    "s",
    "mf",
    "mf",
    "s",
    "e",
    "e",
    "s",
    "s",
    "s",
    "ms",
    "mf",
    "mf",
    "s",
    "mf",
    "mf",
    "mf",
    "f",
    "mf",
    "mf",
    "mf",
    "ms",
    "s",
    "mf",
    "s",
    "mf",
    "f",
    "mf",
    "mf",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "ms",
    "s",
    "s",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "f",
    "f",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "mf",
    "mf",
    "f",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "ms",
    "ms",
    "f",
    "f",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "s",
    "s",
    "s",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "f",
    "mf",
    "mf",
    "mf",
    "mf",
    "ms",
    "ms",
    "ms",
    "s",
    "s",
    "s",
    "mf",
    "mf",
    "ms",
    "ms",
    "ms",
    "s",
    "s",
    "s",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "ms",
    "ms",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "s",
    "s",
    "s",
    "s",
    "mf",
    "mf",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "mf",
    "ms",
    "ms",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "s",
    "s",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "s",
    "s",
    "s",
    "s",
    "f",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "f",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "ms",
    "ms",
    "ms",
    "f",
    "s",
    "s",
    "mf",
    "mf",
    "mf",
    "mf",
    "f",
    "s",
    "s",
    "ms",
    "s",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "mf",
    "f",
    "f",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "f",
    "f",
    "ms",
    "ms",
    "ms",
    "e",
    "e",
    "e",
    "mf",
    "mf",
    "mf",
    "s",
    "s",
    "ms",
    "ms",
    "mf",
    "mf",
    "ms",
    "ms",
    "mf",
    "mf",
    "s",
    "s",
    "s",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "f",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "s",
    "s",
    "f",
    "mf",
    "mf",
    "mf",
    "s",
    "s",
    "s",
    "s",
    "mf",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "mf",
    "mf",
    "mf",
    "ms",
    "mf",
    "s",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "e",
    "e",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "f",
    "f",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "e",
    "ms",
    "ms",
    "ms",
    "s",
    "s",
    "s",
    "mf",
    "mf",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "ms",
    "ms",
    "mf",
    "mf",
    "mf",
    "f",
    "f",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "mf",
    "mf",
    "s",
    "s",
    "s",
    "mf",
    "mf",
    "ms",
    "s",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "ms",
    "f",
    "s",
    "ms",
    "mf",
    "mf",
    "mf",
    "mf",
    "mf",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s",
    "s"
];