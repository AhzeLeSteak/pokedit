import './PokeDetails.css'
import {useBoxContext} from "../App";

import {TabPanel, TabView} from "primereact/tabview";
import {PkMoveWithPP} from "../data/PokeTypes";
import {useState} from "react";
import {ResponsiveText} from "./ResponsiveText";
import {NAMES} from "../data/NAMES";

export const PokeDetails = () => {

    const {selected_pokemon} = useBoxContext();
    if(!selected_pokemon)
        return <div className="poke-details"></div>;

    const species = String(selected_pokemon.pokedex_id).padStart(3, '0'); // 7 -> '007'

    const name = `${selected_pokemon.nickname} (${NAMES[selected_pokemon.pokedex_id]})`

    const stats = [
        [name, 'Lvl '+selected_pokemon.level],
        ['OT', selected_pokemon.OT_name],
        ['XP', selected_pokemon.exp],
        ['HP', `${selected_pokemon.current_hp}/${selected_pokemon.stats.hp}`],
        ['ATK', selected_pokemon.stats.atk],
        ['DEF', selected_pokemon.stats.def],
        ['SPE', selected_pokemon.stats.atk_spe],
        ['SPD', selected_pokemon.stats.spd]
    ]

    return <div className="poke-details">
        <img alt="" src={`${process.env.PUBLIC_URL}/icons/${species}.png`} className="poke-img cursor-pointer"/>
        <div className="poke-data">
            <TabView>
                <TabPanel headerTemplate={({onClick}) => <img alt="" onClick={onClick} className="header-icon cursor-pointer" src={`${process.env.PUBLIC_URL}/imgs/stats.svg`}></img>}>
                    <div className="poke-stats poke-font">
                        {stats.map((s, i) => <div key={i} className="flex justify-content-between">
                            <span>{s[0]}</span>
                            <span>{s[1]}</span>
                        </div>)}
                    </div>
                </TabPanel>
                <TabPanel headerTemplate={({onClick}) => <img alt="" onClick={onClick} className="header-icon cursor-pointer" src={`${process.env.PUBLIC_URL}/imgs/sword.svg`}></img>}>
                    <MovesInfo moves={selected_pokemon.moves}></MovesInfo>
                </TabPanel>
            </TabView>
        </div>
    </div>
}

function MovesInfo(props: { moves: PkMoveWithPP[] }) {

    const [selectedMoveIndex, setSelectedMoveIndex] = useState(-1);
    const selected_move = props.moves[selectedMoveIndex];

    return <div className="grid">
        {props.moves.map((move, i) =>
            <div className={'col-12 cursor-pointer grid poke-font ' + (i === selectedMoveIndex ? 'selected' : '')} key={i} onClick={() => setSelectedMoveIndex(i)}>
                <img alt="" className="type-badge col-2" src={process.env.PUBLIC_URL + '/types/' + move.type.toLowerCase() + '.png'}/>
                <div className="col"><ResponsiveText text={move.name}/></div>
                <div className="col-2">{move.actual_PP}/{move.PP}PP</div>
            </div>
        )}

        {selected_move && <div className="poke-font col-12">
            {selected_move.effect && selected_move.effect.length && <p className="overflow-y-auto max-h-10rem">{selected_move.effect}</p>}
            <div className="grid">
                <div className="col">POWER {selected_move.power}</div>
                <div className="col">ACCURACY {selected_move.accuracy}</div>
            </div>
        </div>}
    </div>
}

