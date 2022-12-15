export const readNBytes = (buffer: Uint8Array, offset: number, n: number) => {
    let res = 0;
    for(let i = 0; i < n; i++){
        res <<= 8;
        res += buffer[offset + i];
    }
    return res;
}