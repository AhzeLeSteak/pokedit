import './App.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css'
import 'primereact/resources/themes/lara-light-blue/theme.css'

import React, {createContext, useContext, useEffect, useState} from 'react';
import {get_buffer} from "./data/get_buffer";
import {Box} from "./components/Box";
import {Pokemon} from "./data/Pokemon";


const BoxContext = createContext<BoxContextType>({
    pokemon: undefined,
    box_index: 0,
    set_pokemon: (p) => null,
    set_box_index: (i) => null
});

export const useBoxContext = () => useContext(BoxContext);


function App() {

    const [buffer, setBuffer] = useState<Uint8Array>();
    const [pokemon, setPokemon] = useState<Pokemon | undefined>();
    const [activeBox, setActiveBox] = useState(0);

    useEffect(() => {
        get_buffer().then(setBuffer);
    }, []);


    return (
        <div className="App">
            <BoxContext.Provider value={{box_index: activeBox, pokemon, set_box_index: setActiveBox, set_pokemon: setPokemon}}>
                <div className="poke-data"></div>
                {buffer && <Box buffer={buffer}/>}
            </BoxContext.Provider>
        </div>
    );
}


export type BoxContextType = {
    pokemon ?: Pokemon;
    set_pokemon: (p: Pokemon) => void;
    box_index: number;
    set_box_index: (i: number) => void;
}




export default App;
