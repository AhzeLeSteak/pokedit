import './PokeCard.css'

import React, {useMemo} from "react";
import {get_poke} from "../data/get_poke";
import {useBoxContext} from "../App";

export function PokeCard(props: {offset: number, buffer: Uint8Array}){

    const {set_pokemon} = useBoxContext();
    const poke = useMemo(() => get_poke(props.buffer, props.offset), [props.offset, props.buffer]);
    const species = useMemo(() => String(poke.species).padStart(3, '0'), [poke.species]);


    return <img src={`${process.env.PUBLIC_URL}/icons/${species}.png`} className="cursor-pointer" onClick={() => set_pokemon(poke)}/>
}
