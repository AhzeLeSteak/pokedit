import {UInt8ToPKChar} from "./char_encoding";

export const read_n_bytes = (buffer: Uint8Array, offset: number, n: number) => {
    let res = 0;
    for(let i = 0; i < n; i++){
        res <<= 8;
        res += buffer[offset + i];
    }
    return res;
}

export function read_string(buffer: Uint8Array, [offset, length]: number[]){
    let over = false;
    let res = '';
    for(let i = 0; !over && i < length; i++){
        const pkchar = buffer[offset+i];
        const char = UInt8ToPKChar(pkchar);
        if(char === '')
            over = true;
        else
            res += char;
    }
    return res;
}