const filename = 'Pokemon_-_Version_Bleue_France_SGB_Enhanced.sav';

export const get_buffer = () => new Promise<Uint8Array>(resolve => {
    fetch(filename)
        .then(res => res.arrayBuffer())
        .then(ab => new Uint8Array(ab))
        .then(resolve);
})