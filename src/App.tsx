import './App.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primeicons/primeicons.css'

import React, {createContext, DragEventHandler, useContext, useLayoutEffect, useState} from 'react';
import {Box} from "./components/Box";
import {PokeDetails} from "./components/PokeDetails/PokeDetails";
import {SaveDataType} from "./data/AbstractSaveDataReader";
import {Pokemon} from "./data/PokeTypes";
import {Gen1SaveDataReader} from "./data/Gen1/Gen1SaveDataReader";
import {Party} from "./components/Party";
import {DexDialog} from "./components/DexDialog";


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

    const handleFileData = async(file: Blob) => {
        const buffer = await file.arrayBuffer()
        const uint8Array = new Uint8Array(buffer);
        const save_data = new Gen1SaveDataReader(uint8Array).get_save_data();
        setSaveData(save_data);
    };

    const handleDropFile: DragEventHandler = (event) => {
        event.preventDefault();
        return handleFileData(event.dataTransfer.files[0]);
    };

    const handleClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = () => input.files && input.files.length && handleFileData(input.files[0]);
        input.click();
    };

    return (
        <div className={'App ' + (aspectRatio > ASPECT_RATIO ? 'horizontal' : 'vertical')} style={{'--aspect-ratio': ASPECT_RATIO} as React.CSSProperties}>
            {saveData ?
                <BoxContext.Provider value={{selected_pokemon: pokemon, set_pokemon: setPokemon}}>
                    <PokeDetails></PokeDetails>
                    <Party save_data={saveData}></Party>
                    <Box save_data={saveData} box_index={activeBox} set_box_index={setActiveBox}/>
                    <DexDialog dex_info={saveData.pokedex}/>
                </BoxContext.Provider>
                :
                <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div onClick={handleClick} onDrop={handleDropFile} onDragOver={ev => ev.preventDefault()} id="drop-zone" className="poke-font">
                        Drop your save file here
                    </div>
                </div>
            }
        </div>
    );
}


export type BoxContextType = {
    selected_pokemon ?: Pokemon;
    set_pokemon: (p: Pokemon) => void;
}




export default App;
