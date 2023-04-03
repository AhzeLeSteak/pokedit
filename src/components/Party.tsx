import './Party.css'
import {PokeCard} from "./PokeCard";
import {useSaveContext} from "../pages/SaveViewer";
import React from "react";

export const Party = () => {

    const {save_reader} = useSaveContext();

    return <div className="party">
        {Array(6).fill(0).map((_, i) => {
            const pokemon = save_reader.save.party[i];
            return <PokeCard key={i}
                             pokemon={pokemon}
                             location={{location: "party", pk_index: Math.min(i, save_reader.save.party.length)}}
            />
        })}
    </div>
}
