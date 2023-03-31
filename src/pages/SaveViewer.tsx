import './SaveViewer.scss'
import {PokeDetails} from "../components/PokeDetails/PokeDetails";
import {Party} from "../components/Party";
import {Box} from "../components/Box";
import {DexDialog} from "../components/DexDialog";
import React, {createContext, useContext, useState} from "react";
import {Pokemon} from "../data/PokeTypes";
import {SaveReader} from "../data/SaveReader";

type BoxContextType = {
    save_reader: SaveReader,
    selected_pokemon ?: Pokemon;
    set_pokemon: (p: Pokemon) => void;
    update: () => void
}

const BoxContext = createContext<BoxContextType>({
// @ts-ignore
    save_reader: undefined,
    selected_pokemon: undefined,
    set_pokemon: () => null,
    update: () => null
});

export const useSaveContext = () => useContext(BoxContext);

export const SaveViewer = ({saveReader, onHome, edit}: {onHome: Function, saveReader: SaveReader, edit: boolean}) => {

    const [pokemon, setPokemon] = useState<Pokemon | undefined>();
    const [btnsVisible, setBtnsVisible] = useState(false);
    const [dexVisible, setDexVisible] = useState(false);
    const [, setUpdate] = useState(0);
    const update = () => setUpdate(i => i+1);

    return <div id="save-viewer">
        <BoxContext.Provider value={{update, save_reader: saveReader, selected_pokemon: pokemon, set_pokemon: setPokemon}}>
            <PokeDetails/>
            <Party/>
            <Box/>

            <div className={'buttons'+(btnsVisible ? '' : ' closed')}>
                <button onClick={() => setBtnsVisible(v => !v)}></button>
                <button id="home-btn" title="Home" onClick={() => onHome()} />
                <button id="dex-btn" title="Show dex entries" onClick={() => setDexVisible(true)} />
                <DownloadButton saveReader={saveReader}/>
                {edit && <>
                    <button id="up-btn" title="Upload modifications"></button>
                    <button id="sort-btn" title="Sort boxes" onClick={() => {saveReader.sort(); update();}}></button>
                </>}
            </div>

            <DexDialog dex_info={saveReader.save.pokedex} visible={dexVisible} onClose={() => setDexVisible(false)}/>
        </BoxContext.Provider>
    </div>
}

const DownloadButton = ({saveReader}: {saveReader: SaveReader}) => {
    const downloadBlob = (data: Uint8Array, fileName: string, mimeType = 'application/octet-stream') => {
        const blob = new Blob([data], {
            type: mimeType
        });
        const a = document.createElement('a');
        a.href =  window.URL.createObjectURL(blob);
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
    };
    return <button id="dl-btn" title="Download save file" onClick={() => downloadBlob(saveReader.buffer, 'red.sav')}></button>
}


