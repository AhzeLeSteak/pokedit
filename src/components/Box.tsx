import './Box.css';

import React from "react";
import {PokeCard} from "./PokeCard";
import {SaveDataType} from "../data/AbstractSaveDataReader";
import {ResponsiveText} from "./ResponsiveText";


export function Box(props: {save_data: SaveDataType, box_index: number, set_box_index: (_: number) => void}){

    const {box_index, set_box_index, save_data} = props;

    return <div className="box">
        <div className="box-index poke-font">
            <img className="arrow left" src={`${process.env.PUBLIC_URL}/imgs/left.png`} onClick={() => set_box_index((box_index+11)%12)}></img>
            <ResponsiveText text={'BOX '+(box_index+1)}></ResponsiveText>
            <img className="arrow right" src={`${process.env.PUBLIC_URL}/imgs/right.png`}
            onClick={() => set_box_index((box_index+1)%12)}></img>
        </div>
        <div className="box-grid">
            {save_data.boxes[box_index].map((pk, i) =>
                <PokeCard key={i} pokemon={pk}/>
            )}
        </div>
    </div>
}
