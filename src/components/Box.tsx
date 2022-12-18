import './Box.css';

import React, {useMemo} from "react";
import {PokeCard} from "./PokeCard";
import {
    BOX_1_OFFSET,
    BOX_7_OFFSET,
    BOX_MEMORY_SIZE,
    POKEMON_MEMORY_SIZE,
    POKEMON_OFFSET_IN_BOX
} from "../data/static-data";
import {useBoxContext} from "../App";

const index20 = Array(20).fill(0).map((_, i) => i);

export function Box(props: {buffer: Uint8Array}){

    const {buffer} = props;
    const {set_box_index, box_index} = useBoxContext();
    const boxOffset = useMemo(() =>
            box_index < 6
                ? BOX_1_OFFSET + box_index * BOX_MEMORY_SIZE
                : BOX_7_OFFSET + (box_index-6)*BOX_MEMORY_SIZE,
        [box_index]);

    return <div className="box">
        <div className="box-index poke-font">
            <img className="arrow left" src={`${process.env.PUBLIC_URL}/left.png`} onClick={() => set_box_index((box_index+11)%12)}></img>
            BOITE {box_index+1}
            <img className="arrow right" src={`${process.env.PUBLIC_URL}/right.png`}
            onClick={() => set_box_index((box_index+1)%12)}></img>
        </div>
        <div className="box-grid">
            {index20.map(i =>
                <PokeCard offset={boxOffset + POKEMON_OFFSET_IN_BOX + i * POKEMON_MEMORY_SIZE} buffer={buffer}/>
            )}
        </div>
    </div>
}
