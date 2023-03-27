import './Box.css';

import React, {useState} from "react";
import {PokeCard} from "./PokeCard";
import {useSaveContext} from "../pages/SaveViewer";


export function Box(){
    const {save_reader} = useSaveContext();
    const [activeBox, setActiveBox] = useState(0);

    return <div className="box">
        <div className="box-index poke-font">
            <img className="arrow left" src={`${process.env.PUBLIC_URL}/imgs/left.png`} onClick={() => setActiveBox((activeBox+11)%12)}></img>
            <span>BOX {activeBox+1}</span>
            <img className="arrow right" src={`${process.env.PUBLIC_URL}/imgs/right.png`}
            onClick={() => setActiveBox((activeBox+1)%12)}></img>
        </div>
        <div className="box-grid">
            {save_reader.save.boxes[activeBox].map((pk, i) =>
                <PokeCard key={i} pokemon={pk}/>
            )}
        </div>
    </div>
}
