import './PokeData.css'
import {useBoxContext} from "../App";
import {SPECIES} from "../data/Gen1/static-data";

import {TabPanel, TabView} from "primereact/tabview";
import {PkMoveWithPP} from "../data/PokeTypes";
import {useState} from "react";

export const PokeData = () => {

    const {selected_pokemon} = useBoxContext();


    if(!selected_pokemon)
        return <div className="poke-data"></div>;

    const species = String(selected_pokemon.pokedex_id).padStart(3, '0');

    const name = `${selected_pokemon.nickname} (${SPECIES[selected_pokemon.pokedex_id]})`

    const stats = [
        [name, 'Lvl '+selected_pokemon.level],
        ['OT', selected_pokemon.OT_name],
        ['XP', selected_pokemon.exp],
        ['HP', `${selected_pokemon.currentHp}/${selected_pokemon.base_stats.hp}`],
        ['ATK', selected_pokemon.base_stats.atk],
        ['DEF', selected_pokemon.base_stats.def],
        ['SPE', selected_pokemon.base_stats.atk_spe],
        ['SPD', selected_pokemon.base_stats.spd]
    ]

    return <div className="poke-data">
        <img src={`${process.env.PUBLIC_URL}/icons/${species}.png`} className="poke-img cursor-pointer"/>
        <TabView>
            <TabPanel headerTemplate={({onClick}) => <img onClick={onClick} className="header-icon cursor-pointer" src={`${process.env.PUBLIC_URL}/imgs/stats.svg`}></img>}>
                <div className="poke-stats poke-font">
                    {stats.map((s, i) => <div key={i} className="flex justify-content-between">
                        <span>{s[0]}</span>
                        <span>{s[1]}</span>
                    </div>)}
                </div>
            </TabPanel>
            <TabPanel headerTemplate={({onClick}) => <img onClick={onClick} className="header-icon cursor-pointer" src={`${process.env.PUBLIC_URL}/imgs/sword.svg`}></img>}>
                <MovesInfo moves={selected_pokemon.moves}></MovesInfo>
            </TabPanel>
        </TabView>
    </div>
}

function MovesInfo(props: { moves: PkMoveWithPP[] }) {

    const [selectedMoveIndex, setSelectedMoveIndex] = useState(-1);
    const selected_move = props.moves[selectedMoveIndex];

    return <div className="grid">
        {props.moves.map((move, i) =>
            <div className={'col-12 cursor-pointer grid poke-font ' + (i === selectedMoveIndex ? 'selected' : '')} key={i} onClick={() => setSelectedMoveIndex(i)}>
                <img className="type-badge col-2" src={process.env.PUBLIC_URL + '/types/' + move.type.toLowerCase() + '.png'}/>
                <div className="col" style={{fontSize: '2vh'}}>{move.name}</div>
                <div className="col-2">{move.actual_PP}/{move.PP}PP</div>
            </div>
        )}

        {selected_move && <div className="poke-font col-12">
            <p className="overflow-y-auto max-h-10rem">{selected_move.effect}</p>
            <div className="grid">
                <div className="col">POWER {selected_move.power}</div>
                <div className="col">ACCURACY {selected_move.accuracy}</div>
            </div>
        </div>}
    </div>
}

