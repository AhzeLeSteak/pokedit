import './Box.css';

import React from "react";
import {PokeCard} from "./PokeCard";
import {useBoxContext} from "../App";
import {Pokemon} from "../data/PokeTypes";


export function Box(props: {pokemons: Pokemon[]}){

    const {set_box_index, box_index} = useBoxContext();

    return <div className="box">
        <div className="box-index poke-font">
            <img className="arrow left" src={`${process.env.PUBLIC_URL}/left.png`} onClick={() => set_box_index((box_index+11)%12)}></img>
            BOITE {box_index+1}
            <img className="arrow right" src={`${process.env.PUBLIC_URL}/right.png`}
            onClick={() => set_box_index((box_index+1)%12)}></img>
        </div>
        <div className="box-grid">
            {props.pokemons.map((pk, i) =>
                <PokeCard key={i} pokemon={pk}/>
            )}
        </div>
    </div>
}
