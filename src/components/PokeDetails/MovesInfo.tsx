import {PkMoveWithPP} from "../../data/types/pokemon";
import {CSSProperties, useEffect, useState} from "react";
import './MovesInfo.scss';

export function MovesInfo(props: { moves: PkMoveWithPP[] }) {

    let [selectedMoveIndex, setSelectedMoveIndex] = useState(0);
    if(selectedMoveIndex >= props.moves.length)
        selectedMoveIndex = 0;

    useEffect(() => setSelectedMoveIndex(0), [props.moves]); //set 0 when changing selected pkmon
    if(!props.moves || !props.moves.length)
        return <></>;

    const selected_move = props.moves[selectedMoveIndex];
    const effect = [selected_move.power, 'POWER', 'ACCURACY', selected_move.accuracy];

    return <div className="tab-content moves-tab poke-font">
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

        <div className="effect">
            {effect.map((e, i) => <span key={i}>{e}</span>)}
        </div>
        <div className="description overflow-y-auto">
            {selected_move.effect && selected_move.effect.length && <span>{selected_move.effect}</span>}
        </div>

    </div>
}
