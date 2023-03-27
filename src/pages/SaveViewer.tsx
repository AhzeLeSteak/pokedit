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

export const SaveViewer = ({saveReader, onHome}: {onHome: Function, saveReader: SaveReader}) => {

    const [pokemon, setPokemon] = useState<Pokemon | undefined>();
    const [dexVisible, setDexVisible] = useState(false);
    const [_update, setUpdate] = useState(0);
    const update = () => setUpdate(i => i+1);

    return <div id="save-viewer">
        <BoxContext.Provider value={{update, save_reader: saveReader, selected_pokemon: pokemon, set_pokemon: setPokemon}}>
            <PokeDetails/>
            <Party/>
            <Box/>

            <div className="buttons">
                <button onClick={() => onHome()} id="home-btn" />
                <button onClick={() => setDexVisible(true)} id="dex-btn" />
            </div>

            <DexDialog dex_info={saveReader.save.pokedex} visible={dexVisible} onClose={() => setDexVisible(false)}/>
        </BoxContext.Provider>
    </div>
}
