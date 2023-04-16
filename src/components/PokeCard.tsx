import './PokeCard.css'

import React from "react";
import {Pokemon} from "../data/types/pokemon";
import {useSaveContext} from "../pages/SaveViewer";
import {NAMES} from "../data/static-data/names";
import {Location} from "../data/types/location";

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


    const species = pokemon.pokedex_id === -1 ? 'N/A' : NAMES[pokemon.pokedex_id].toLowerCase();

    return <img src={`${process.env.PUBLIC_URL}/icons/${pokemon.is_egg ? 'egg' : species}.png`}
                className="cursor-pointer poke-card"
                onClick={() => set_pokemon(pokemon)}
                onDoubleClick={() => console.log(location, pokemon)}
                draggable={true}
                onDragStart={e => e.dataTransfer.setData('text/plain', JSON.stringify(location))}
                onDragOver={e => e.preventDefault()}
                onDrop={onDrop}
    />
}
