const fs = require('fs');

const filename = 'Pokemon_-_Version_Bleue_France_SGB_Enhanced.sav';

const getBuffer = () => new Promise(resolve => {
    fs.open(filename, 'r', function(status, fd) {
        if (status) {
            console.log(status.message);
            return;
        }
        const buffer = Buffer.alloc(32000);

        fs.read(fd, buffer, 0, 32000, 0, function(err, num) {
            resolve(buffer);
        });
    });
})


const PLAYER_NAME = [0x2598, 0xB];
const RIVAL_NAME = [0x25F6, 0xB];

getBuffer().then(buffer => {
    console.log(getStringFromBuffer(buffer, PLAYER_NAME))
    console.log(getStringFromBuffer(buffer, RIVAL_NAME));

    getBoxInfo(buffer, 0);
});

/**
 *
 * @param buffer Buffer
 * @param boxIndex number ∈ [0; 12]
 */
function getBoxInfo(buffer, boxIndex){

    const boxOffset = boxIndex < 6 ? 0x4000 + boxIndex * 0x462 : 0x6000 + (boxIndex-6)*0x462;

    const i20 = Array(20).fill(0).map((e, i) => i);
    const species = i20.map(i => buffer.readUInt8(boxOffset+1+i));

    console.log('pkmnCount', buffer.readUInt8(boxOffset));
    console.log('species', species)
    for(let i = 0; i < 20; i++)
        console.log('poke', readPokemon(buffer, boxOffset + 0x16 + i*0x21));
}

function readPokemon(buffer, base_offset){
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

    const poke = {};

    for(const key in structure){
        const bytes = structure[key];
        poke[key] = buffer.readUintBE(base_offset, bytes);
        base_offset += bytes;
    }

    return poke;
}


function getStringFromBuffer(buffer, [offset, length]){
    let over = false;
    let res = '';
    for(let i = 0; !over && i < length; i++){
        const pkchar = buffer.readUInt8(offset+i);
        const char = UInt8ToPKChar(pkchar);
        if(char === '')
            over = true;
        else
            res += char;
    }
    return res;
}

const intToAlphabet = int => (int+10).toString(36);

function UInt8ToPKChar(uint){
    const chars = Array(0xF*0xF).fill('');
    for(let i = 0; i < 26; i++){
        chars[i+0x80] = intToAlphabet(i).toUpperCase();
    }
    return chars[uint];
}