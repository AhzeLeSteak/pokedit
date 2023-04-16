import './PokeDetails.scss'
import React, {useState} from "react";
import {MovesInfo} from "./MovesInfo";
import {StatsInfo} from "./StatsInfo";
import {BaseInfo} from "./BaseInfo";
import {NAMES} from "../../data/static-data/names";
import {useSaveContext} from "../../pages/SaveViewer";

export const PokeDetails = () => {

    const {selected_pokemon} = useSaveContext();
    const [selectedTab, setSelectedTab] = useState(0);

    if(!selected_pokemon)
        return <div className="poke-details"></div>;

    const species = NAMES[selected_pokemon.pokedex_id];

    return <div className="poke-details">
        <img alt="" src={`${process.env.PUBLIC_URL}/icons/${species}.png`} className="poke-img cursor-pointer"/>
        <div className="types flex flex-column poke-font">
            <span>{NAMES[selected_pokemon.pokedex_id]}</span>
            <span>/{selected_pokemon.nickname}</span>
            <span>LV. {selected_pokemon.level}</span>
        </div>
        <div className={`tab-select tab-${selectedTab} flex justify-content-around align-items-center`}>
            {[0, 1, 2, 3].map(i =>
                <div key={i} onClick={() => i < 3 && setSelectedTab(i)}></div>
            )}
        </div>

        {selectedTab === 0 && <BaseInfo poke={selected_pokemon}/>}
        {selectedTab === 1 && <StatsInfo poke={selected_pokemon}/>}
        {selectedTab === 2 && <MovesInfo moves={selected_pokemon.moves}/>}

    </div>
}

