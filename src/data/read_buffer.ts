import {PKCharToUInt8, UInt8ToPKChar} from "./Gen1/char_encoding";
import {Language} from "../firebase/types";

export const read_n_bytes = (buffer: Uint8Array, offset: number, n: number) => {
    let res = 0;
    for(let i = 0; i < n; i++){
        res <<= 8;
        res += buffer[offset + i];
    }
    return res;
}

export const read_string = (buffer: Uint8Array, offset: number, language: Language, length: number) => {
    let over = false;
    let res = '';
    for(let i = 0; !over && i < length; i++){
        const uint = buffer[offset+i];
        const char = UInt8ToPKChar(uint, language);
        if(char === '' || !char)
            over = true;
        else
            res += char;
    }
    return res;
};

export const write_n_bytes = (buffer: Uint8Array, offset: number, n: number, value: number) => {
    for(let i = n-1; i >= 0; i--){
        buffer[offset+i] = (value+256) % 256;
        value >>= 8;
    }
}


export const write_string = (buffer: Uint8Array, offset: number, value: string, language: Language, length: number) => {
    let i = 0;
    for(i; i < value.length; i++){
        buffer[offset+i] = PKCharToUInt8(value[i], language);
    }
    for(i; i < length; i++){
        buffer[offset+i] = language !== 'JP' ? 80 : 0;
    }
}
