import './PokeCard.css'

import React from "react";
import {useBoxContext} from "../App";
import {Pokemon} from "../data/PokeTypes";

export function PokeCard(props: {pokemon: Pokemon}){

    const {set_pokemon} = useBoxContext();
    const species = String(props.pokemon.pokedex_id).padStart(3, '0');


    return <img src={`${process.env.PUBLIC_URL}/icons/${species}.png`}
                className="cursor-pointer"
                onClick={() => set_pokemon(props.pokemon)}
                onDoubleClick={() => console.log(props.pokemon)}
    />
}
