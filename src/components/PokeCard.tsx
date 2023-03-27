import './PokeCard.css'

import React, {useId} from "react";
import {Location, Pokemon} from "../data/PokeTypes";
import {useSaveContext} from "../pages/SaveViewer";

export function PokeCard(props: {pokemon: Pokemon}){

    const {set_pokemon, save_reader, update} = useSaveContext();
    const species = String(props.pokemon.pokedex_id).padStart(3, '0');
    const id = useId();

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain') as Location;
        save_reader.swap(props.pokemon.location_in_save, data);
        update();
    }


    return <img src={`${process.env.PUBLIC_URL}/icons/${species}.png`}
                id={id}
                className="cursor-pointer poke-card"
                onClick={() => set_pokemon(props.pokemon)}
                onDoubleClick={() => console.log(props.pokemon)}
                draggable={true}
                onDragStart={e => e.dataTransfer.setData('text/plain', props.pokemon.location_in_save)}
                onDragOver={e => e.preventDefault()}
                onDrop={onDrop}
    />
}
