import './Box.scss';

import React, {useCallback, useState} from "react";
import {PokeCard} from "./PokeCard";
import {useSaveContext} from "../pages/SaveViewer";

let interval : NodeJS.Timer | undefined;

export function Box(){
    const {save_reader} = useSaveContext();
    const [activeBox, setActiveBox] = useState(0);

    const every = useCallback((f: Function, ms: number) => {
        if(interval) return
        interval = setInterval(() => {
            f();
            clearInterval(interval)
            interval = undefined;
        }, ms);
    }, []);

    const stop = useCallback(() => {
        clearInterval(interval);
        interval = undefined;
    }, []);



    return <div className="box">
        <div className="box-index poke-font">
            <img className="arrow left" src={`${process.env.PUBLIC_URL}/imgs/left.png`}
                 onClick={() => setActiveBox((activeBox+11)%12)}
                 onDragOver={() => every(() => setActiveBox(b => (b+11)%12), 400)}
                 onDragLeave={() => stop()}
            ></img>
            <span>BOX {activeBox+1}</span>
            <img className="arrow right" src={`${process.env.PUBLIC_URL}/imgs/right.png`}
                 onClick={() => setActiveBox((activeBox+1)%12)}
                 onDragOver={() => every(() => setActiveBox(b => (b+1)%12), 400)}
                 onDragLeave={() => stop()}
            ></img>
        </div>
        <div className="box-grid">
            {Array(save_reader.save.box_size).fill(0).map((_, i) => {
                const box = save_reader.save.boxes[activeBox];
                return <PokeCard key={i}
                                 pokemon={box[i]}
                                 location={{location: 'box', box_index: activeBox, pk_index: Math.min(i, box.length)}}
                />
            })}
        </div>
    </div>
}
