export function UInt8ToPKChar(uint: number){
    const chars = Array(0xF*0xF).fill('');
    for(let i = 0; i < 26; i++){
        chars[i+0x80] = intToAlphabet(i).toUpperCase();
    }
    for(let i = 0; i < 26; i++){
        chars[i+0xA0] = intToAlphabet(i).toLowerCase();
    }
    for(let i = 0; i < 10; i++){
        chars[i+ 0xF7] = i.toString();
    }

    return chars[uint];
}

const intToAlphabet = (int: number) => (int+10).toString(36);