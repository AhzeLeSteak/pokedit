import './App.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css'
import 'primereact/resources/themes/lara-light-blue/theme.css'

import React, {useEffect, useMemo, useState} from 'react';
import {TabPanel, TabView} from 'primereact/tabview';
import {getBuffer} from "./data/getBuffer";
import {Card} from "primereact/card";
import {getPoke} from "./data/getPoke";
import {SPECIES} from "./data/static-data";

type DataType = Uint8Array;
const index12 = Array(12).fill(0).map((_, i) => i);
const index20 = Array(20).fill(0).map((_, i) => i);

function App() {

    const [activeIndex, setActiveIndex] = useState(0);
    const [buffer, setBuffer] = useState<DataType>();

    useEffect(() => {
        getBuffer().then(setBuffer);
    }, []);


    return (
        <div className="App">

            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                {buffer && index12.map(i => <TabPanel header={`Boîte ${i+1}`}>
                    <BoxContent boxIndex={i} buffer={buffer}></BoxContent>
                </TabPanel>)}
            </TabView>
        </div>
    );
}

function BoxContent(props: {boxIndex: number, buffer: DataType}){

    const {boxIndex, buffer} = props;

    const boxOffset = useMemo(() => boxIndex < 6 ? 0x4000 + boxIndex * 0x462 : 0x6000 + (boxIndex-6)*0x462, [boxIndex]);

    return <div className="grid">
        {index20.map(i => <div className="col-2">
            <PokeCard offset={boxOffset + 0x16 + i*0x21} buffer={buffer}/>
        </div>)}
    </div>
}

function PokeCard(props: {offset: number, buffer: DataType}){

    const poke = useMemo(() => getPoke(props.buffer, props.offset), [props.offset, props.buffer]);

    return <Card title={SPECIES[poke.species]} subTitle="SubTitle">
        {props.offset.toString(16)}
    </Card>
}

export default App;
