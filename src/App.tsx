import './App.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css'
import 'primereact/resources/themes/lara-light-blue/theme.css'

import React, {useEffect, useState} from 'react';
import {TabPanel, TabView} from 'primereact/tabview';
import {getBuffer} from "./data/getBuffer";
import {Box} from "./Box";

const index12 = Array(12).fill(0).map((_, i) => i);

function App() {

    const [activeIndex, setActiveIndex] = useState(0);
    const [buffer, setBuffer] = useState<Uint8Array>();

    useEffect(() => {
        getBuffer().then(setBuffer);
    }, []);


    return (
        <div className="App">

            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                {buffer && index12.map(i => <TabPanel header={`Boîte ${i+1}`}>
                    <Box boxIndex={i} buffer={buffer}></Box>
                </TabPanel>)}
            </TabView>
        </div>
    );
}





export default App;
