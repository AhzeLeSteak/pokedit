import {readNBytes} from "./read";

export const getPoke = (buffer: Uint8Array, offset: number) => {
    const structure = {
        species: 1,
        currentHp: 2,
        level: 1,
        status: 1,
        type1: 1,
        type2: 1,
        item: 1,
        move1: 1,
        move2: 1,
        move3: 1,
        move4: 1,
        OGTrainerID: 2,
        exp: 3,
        EV_HP: 2,
        ATK_EV: 2,
        DEF_EV: 2,
        SPD_EV: 2,
        SPE_EV: 2,
        IV: 2,
        move1PP: 1,
        move2PP: 1,
        move3PP: 1,
        move4PP: 1,
        level_doublon: 1,
        maxHP: 2,
        atk: 2,
        def: 2,
        spd: 2,
        spe: 2
    }

    const poke: any = {};

    let key: keyof typeof structure;
    for(key in structure){
        const bytes = structure[key];
        poke[key] = readNBytes(buffer, offset, bytes);
        offset += bytes;
    }

    return poke;
};