import './App.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css'
import 'primereact/resources/themes/lara-light-blue/theme.css'

import React, {createContext, useContext, useEffect, useLayoutEffect, useState} from 'react';
import {Box} from "./components/Box";
import {PokeDetails} from "./components/PokeDetails/PokeDetails";
import {SaveDataType} from "./data/AbstractSaveDataReader";
import {Pokemon} from "./data/PokeTypes";
import {Gen1SaveDataReader} from "./data/Gen1/Gen1SaveDataReader";
import {Party} from "./components/Party";


const BoxContext = createContext<BoxContextType>({
    selected_pokemon: undefined,
    set_pokemon: () => null,
});

export const useBoxContext = () => useContext(BoxContext);

const APP_WIDTH = 307;
const APP_HEIGHT = 160;
const ASPECT_RATIO = APP_WIDTH / APP_HEIGHT;


function App() {

    const [saveData, setSaveData] = useState<SaveDataType>();
    const [pokemon, setPokemon] = useState<Pokemon | undefined>();
    const [activeBox, setActiveBox] = useState(0);

    const [aspectRatio, setAspectRatio] = useState(1);

    useLayoutEffect(() => {
        function updateSize() {
            setAspectRatio(window.innerWidth / window.innerHeight);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        const filename = 'Pokemon_-_Version_Bleue_France_SGB_Enhanced.sav';
        new Gen1SaveDataReader(filename)
            .init()
            .then(reader => setSaveData(reader.get_save_data()));
    }, []);

    if(!saveData)
        return <></>


    return (
        <div className={'App ' + (aspectRatio > ASPECT_RATIO ? 'horizontal' : 'vertical')} style={{'--aspect-ratio': ASPECT_RATIO} as React.CSSProperties}>
            <BoxContext.Provider value={{selected_pokemon: pokemon, set_pokemon: setPokemon}}>
                <PokeDetails></PokeDetails>
                <Party save_data={saveData}></Party>
                <Box save_data={saveData} box_index={activeBox} set_box_index={setActiveBox}/>
            </BoxContext.Provider>
        </div>
    );
}


export type BoxContextType = {
    selected_pokemon ?: Pokemon;
    set_pokemon: (p: Pokemon) => void;
}




export default App;
