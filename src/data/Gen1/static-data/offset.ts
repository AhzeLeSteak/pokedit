export const OFFSET = {
    PLAYER_NAME: 0x2598,
    RIVAL_NAME: 0x25F6,
    CURRENT_BOX_NUMBER: 0x284C,
    CURRENT_BOX: 0x30C0,
    BOX: {
        BOX_1: 0x4000,
        BOX_7: 0x6000,
        SPECIES: 0x01,
        POKEMONS: 0x16,
        POKEMON_NAMES: 0x386,
        OT_NAMES: 0x2AA

    },
    PARTY: {
        OFFSET: 0x2F2C,
        SPECIES: 0x01,
        POKEMONS: 0x8,
        POKEMON_NAMES: 0x152,
        OT_NAMES: 0X110
    },
    POKEDEX:{
        OWNED: 0x25A3,
        SEEN: 0x25B6
    },
    CHECKSUM: {
        MAIN_DATA: 0x3523,
        BANK_2: 0x5A4C,
        BANK_3: 0x7A4C,
    }
}

export const MEMORY_SIZE = {
    STRING_LENGTH: 0xB,
    BOX: 0x462,
    POKEMON_IN_BOX: 0x21,
    POKEMON_IN_PARTY: 0x2C,
    INDIVIDUAL_CHECKSUM: 0x6
}
