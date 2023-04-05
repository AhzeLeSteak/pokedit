import './PokeCard.css'

import React from "react";
import {Location, Pokemon} from "../data/PokeTypes";
import {useSaveContext} from "../pages/SaveViewer";
import {NAMES} from "../data/NAMES";

export function PokeCard({location, pokemon}: { pokemon: Pokemon, location: Location }){

    const {set_pokemon, save_reader, update} = useSaveContext();

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData('text/plain')) as Location;
        if(pokemon)
            save_reader.swap(location, data);
        else
            save_reader.transfer(data, location);
        update();
    }

    if(!pokemon)
        return <img src={`${process.env.PUBLIC_URL}/icons/empty.png`}
                    className="cursor-pointer poke-card"
                    onDoubleClick={() => console.log(location)}
                    onDrop={onDrop}
                    onDragOver={e => e.preventDefault()}
        />

    const species = NAMES[pokemon.pokedex_id].toLowerCase();
    return <img src={`${process.env.PUBLIC_URL}/icons/${species}.png`}
                className="cursor-pointer poke-card"
                onClick={() => set_pokemon(pokemon)}
                onDoubleClick={() => console.log(location, pokemon)}
                draggable={true}
                onDragStart={e => e.dataTransfer.setData('text/plain', JSON.stringify(location))}
                onDragOver={e => e.preventDefault()}
                onDrop={onDrop}
    />
}
