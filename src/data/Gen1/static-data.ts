import {PkType} from "../PokeTypes";


export const OFFSET = {
    PLAYER_NAME: 0x2598,
    RIVAL_NAME: 0x25F6,
    CURRENT_BOX_NUMBER: 0x284C,
    CURRENT_BOX: 0x30C0,
    BOX: {
        BOX_1: 0x4000,
        BOX_7: 0x6000,
        POKEMONS: 0x16,
        POKEMON_NAMES: 0x386,
        OT_NAMES: 0x2AA

    },
    PARTY: {
        OFFSET: 0x2F2C,
        POKEMONS: 0x8,
        POKEMON_NAMES: 0x152,
        OT_NAMES: 0X110
    },
    POKEDEX:{
        OWNED: 0x25A3,
        SEEN: 0x25B6
    }
}

export const MEMORY_SIZE = {
    STRING_LENGTH: 0xB,
    BOX: 0x462,
    POKEMON_IN_BOX: 0x21,
    POKEMON_IN_PARTY: 0x2C
}


export const TYPES : PkType[] = [
    'NORMAL',
    'FIGHTING',
    'FLYING',
    'POISON',
    'GROUND',
    'ROCK',
    'NONE', //'BIRD'
    'BUG',
    'GHOST',
    'NONE', 'NONE', 'NONE', 'NONE', 'NONE', 'NONE', 'NONE', 'NONE', 'NONE', 'NONE', 'NONE', //unused bytes
    'FIRE',
    'WATER',
    'GRASS',
    'ELECTRIC',
    'PSYCHIC',
    'ICE',
    'DRAGON'
]

export const SPECIES = [
    0,
    112,
    115,
    32,
    35,
    21,
    100,
    34,
    80,
    2,
    103,
    108,
    102,
    88,
    94,
    29,
    31,
    104,
    111,
    131,
    59,
    151,
    130,
    90,
    72,
    92,
    123,
    120,
    9,
    127,
    114,
    0,
    0,
    58,
    95,
    22,
    16,
    79,
    64,
    75,
    113,
    67,
    122,
    106,
    107,
    24,
    47,
    54,
    96,
    76,
    0,
    126,
    0,
    125,
    82,
    109,
    0,
    56,
    86,
    50,
    128,
    0,
    0,
    0,
    83,
    48,
    149,
    0,
    0,
    0,
    84,
    60,
    124,
    146,
    144,
    145,
    132,
    52,
    98,
    0,
    0,
    0,
    37,
    38,
    25,
    26,
    0,
    0,
    147,
    148,
    140,
    141,
    116,
    117,
    0,
    0,
    27,
    28,
    138,
    139,
    39,
    40,
    133,
    136,
    135,
    134,
    66,
    41,
    23,
    46,
    61,
    62,
    13,
    14,
    15,
    0,
    85,
    57,
    51,
    49,
    87,
    0,
    0,
    10,
    11,
    12,
    68,
    0,
    55,
    97,
    42,
    150,
    143,
    129,
    0,
    0,
    89,
    0,
    99,
    91,
    0,
    101,
    36,
    110,
    53,
    105,
    0,
    93,
    63,
    65,
    17,
    18,
    121,
    1,
    3,
    73,
    0,
    118,
    119,
    0,
    0,
    0,
    0,
    77,
    78,
    19,
    20,
    33,
    30,
    74,
    137,
    142,
    0,
    81,
    0,
    0,
    4,
    7,
    5,
    8,
    6,
    0,
    0,
    0,
    0,
    43,
    44,
    45,
    69,
    70,
    71
];
