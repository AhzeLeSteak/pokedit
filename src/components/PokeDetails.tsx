import './PokeDetails.scss'
import {useBoxContext} from "../App";
import {PkMoveWithPP} from "../data/PokeTypes";
import {CSSProperties, useState} from "react";

export const PokeDetails = () => {

    const {selected_pokemon} = useBoxContext();
    const [selectedTab, setSelectedTab] = useState(0);

    if(!selected_pokemon)
        return <div className="poke-details"></div>;

    const species = String(selected_pokemon.pokedex_id).padStart(3, '0'); // 7 -> '007'

    //const name = `${selected_pokemon.nickname} (${NAMES[selected_pokemon.pokedex_id]})`

    const stats = [
        'HP', `${selected_pokemon.current_hp}/${selected_pokemon.stats.hp}`,
        'ATK', selected_pokemon.stats.atk,
        'DEF', selected_pokemon.stats.def,
        'SP.ATK', selected_pokemon.stats.atk_spe,
        'SP.DEF', selected_pokemon.stats.atk_spe,
        'SPD', selected_pokemon.stats.spd
    ];

    const xp_data = ['EXP_POINTS', selected_pokemon.exp, 'NEXT LV.', 'N/A'];

    return <div className="poke-details">
        <img alt="" src={`${process.env.PUBLIC_URL}/icons/${species}.png`} className="poke-img cursor-pointer"/>
        <div className="types flex flex-column">
            {selected_pokemon.types.map(type =>
                <img alt="" className="type-badge" src={process.env.PUBLIC_URL + '/types/' + type.toLowerCase() + '.png'}/>)}
        </div>
        <div className={`tab-select tab-${selectedTab} flex justify-content-around align-items-center`}>
            {[0, 1, 2, 3].map(i =>
                <div key={i} onClick={() => setSelectedTab(i)}></div>
            )}
        </div>

        {selectedTab === 0 && <div className="tab-content stats-tab">
            <div className="stats">
                {stats.map((stat, i) => <span key={i} className="poke-font">{stat}</span>)}
            </div>
            <div className="xp">
                {xp_data.map((stat, i) => <span key={i} className="poke-font">{stat}</span>)}
            </div>
        </div>}

        {selectedTab === 1 && <div className="tab-content moves-tab">
            <MovesInfo moves={selected_pokemon.moves}></MovesInfo>
        </div>}
    </div>
}

function MovesInfo(props: { moves: PkMoveWithPP[] }) {

    const [selectedMoveIndex, setSelectedMoveIndex] = useState(0);
    const selected_move = props.moves[selectedMoveIndex];

    return <>
        <div className="moves poke-font">
            {props.moves.map((move, i) => <>
                <img onClick={() => setSelectedMoveIndex(i)} alt="" className="type-badge cursor-pointer" src={process.env.PUBLIC_URL + '/types/' + move.type.toLowerCase() + '.png'}/>
                <span onClick={() => setSelectedMoveIndex(i)}>{move.name.toUpperCase()}</span>
                <span onClick={() => setSelectedMoveIndex(i)}> <small>PP</small> {move.actual_PP}/{move.PP}</span>
            </>)}
        </div>

        <img className="move-selection"
             src={process.env.PUBLIC_URL + '/imgs/move_selection.png'}
             style={{'--i': selectedMoveIndex} as CSSProperties}
             alt=""
        />

        {selected_move && <div className="poke-font description">
            {selected_move.effect && selected_move.effect.length && <span className="overflow-y-auto">{selected_move.effect}</span>}
        </div>}

    </>
}

