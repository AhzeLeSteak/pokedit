export function UInt8ToPKChar(uint: number){
    const chars = Array(0xF*0xF).fill('');
    for(let i = 0; i < 26; i++){
        chars[i+0x80] = intToAlphabet(i).toUpperCase();
    }
    return chars[uint];
}

const intToAlphabet = (int: number) => (int+10).toString(36);