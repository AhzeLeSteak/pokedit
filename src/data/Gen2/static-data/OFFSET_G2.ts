import {Offset} from "../../SaveReaderOffset";

export const OFFSET_GOLD_EN: Offset = {
    PLAYER_NAME: 0x200B,
    RIVAL_NAME: 0x2021,
    CURRENT_BOX_NUMBER: 0x2724,
    CURRENT_BOX: 0x2D6C,
    BOX: {
        BOX_1: 0x4000,
        BOX_7: 0x59E0,
        SPECIES: 0x01,
        POKEMONS: 0x16,
        POKEMON_NAMES: 0x386,
        OT_NAMES: 0x2AA

    },
    PARTY: {
        OFFSET: 0x288A,
        SPECIES: 0x01,
        POKEMONS: 0x8,
        OT_NAMES: 0X128,
        POKEMON_NAMES: 0x16A
    },
    POKEDEX:{
        OWNED: 0x2A4C,
        SEEN: 0x2A6C
    },
    CHECKSUM: {
        MAIN_DATA: 0x3523,
        BANK_2: 0x5A4C,
        BANK_3: 0x7A4C,
    },
    MEMORY_SIZE : {
        STRING_LENGTH: 0xB,
        BOX: 0x450,
        POKEMON_IN_BOX: 0x20,
        POKEMON_IN_PARTY: 0x30
    }
}
