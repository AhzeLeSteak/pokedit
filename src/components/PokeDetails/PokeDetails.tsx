import './PokeDetails.scss'
import {useBoxContext} from "../../App";
import React, {useState} from "react";
import {MovesInfo} from "./MovesInfo";
import {StatsInfo} from "./StatsInfo";
import {BaseInfo} from "./BaseInfo";

export const PokeDetails = () => {

    const {selected_pokemon} = useBoxContext();
    const [selectedTab, setSelectedTab] = useState(0);

    if(!selected_pokemon)
        return <div className="poke-details"></div>;

    const species = String(selected_pokemon.pokedex_id).padStart(3, '0'); // 7 -> '007'

    //const name = `${selected_pokemon.nickname} (${NAMES[selected_pokemon.pokedex_id]})`




    return <div className="poke-details">
        <img alt="" src={`${process.env.PUBLIC_URL}/icons/${species}.png`} className="poke-img cursor-pointer"/>
        <div className="types flex flex-column">
            {selected_pokemon.types.map(type =>
                <img alt="" key={type} className="type-badge" src={process.env.PUBLIC_URL + '/types/' + type.toLowerCase() + '.png'}/>)}
        </div>
        <div className={`tab-select tab-${selectedTab} flex justify-content-around align-items-center`}>
            {[0, 1, 2, 3].map(i =>
                <div key={i} onClick={() => setSelectedTab(i)}></div>
            )}
        </div>

        {selectedTab === 0 && <BaseInfo poke={selected_pokemon}/>}
        {selectedTab === 1 && <StatsInfo poke={selected_pokemon}/>}
        {selectedTab === 2 && <MovesInfo moves={selected_pokemon.moves}/>}

    </div>
}

