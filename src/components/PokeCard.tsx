import './PokeCard.css'

import React from "react";
import {Pokemon} from "../data/PokeTypes";
import {useBoxContext} from "../pages/SaveViewer";

export function PokeCard(props: {pokemon: Pokemon}){

    const {set_pokemon} = useBoxContext();
    const species = String(props.pokemon.pokedex_id).padStart(3, '0');


    return <img src={`${process.env.PUBLIC_URL}/icons/${species}.png`}
                className="cursor-pointer poke-card"
                onClick={() => set_pokemon(props.pokemon)}
                onDoubleClick={() => console.log(props.pokemon)}
    />
}
