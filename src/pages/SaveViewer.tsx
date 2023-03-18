import './SaveViewer.scss'
import {PokeDetails} from "../components/PokeDetails/PokeDetails";
import {Party} from "../components/Party";
import {Box} from "../components/Box";
import {DexDialog} from "../components/DexDialog";
import React, {createContext, useContext, useState} from "react";
import {Pokemon} from "../data/PokeTypes";
import {BoxContextType} from "../App";
import {SaveDataType} from "../data/AbstractSaveDataReader";

const BoxContext = createContext<BoxContextType>({
    selected_pokemon: undefined,
    set_pokemon: () => null,
});

export const useBoxContext = () => useContext(BoxContext);

export const SaveViewer = ({saveData}: {saveData: SaveDataType}) => {

    const [pokemon, setPokemon] = useState<Pokemon | undefined>();
    const [activeBox, setActiveBox] = useState(0);

    return <div id="save-viewer">
        <BoxContext.Provider value={{selected_pokemon: pokemon, set_pokemon: setPokemon}}>
            <PokeDetails></PokeDetails>
            <Party save_data={saveData}></Party>
            <Box save_data={saveData} box_index={activeBox} set_box_index={setActiveBox}/>
            <DexDialog dex_info={saveData.pokedex}/>
        </BoxContext.Provider>
    </div>
}
