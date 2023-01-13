import React from "react";
import {Pokemon} from "../../data/PokeTypes";
import './StatsInfo.scss'

export const StatsInfo = (props: {poke: Pokemon}) => {

    const stats = [
        'HP', `${props.poke.current_hp}/${props.poke.stats.hp}`,
        'ATK', props.poke.stats.atk,
        'DEF', props.poke.stats.def,
        'SP.ATK', props.poke.stats.atk_spe,
        'SP.DEF', props.poke.stats.atk_spe,
        'SPD', props.poke.stats.spd
    ];

    const xp_data = ['EXP_POINTS', props.poke.exp, 'NEXT LV.', props.poke.next_exp ? props.poke.next_exp - props.poke.exp : 0];
    
    return <div className="tab-content stats-tab">
        <div className="stats">
            {stats.map((stat, i) => <span key={i} className="poke-font">{stat}</span>)}
        </div>
        <div className="xp">
            {xp_data.map((stat, i) => <span key={i} className="poke-font">{stat}</span>)}
        </div>
    </div>;
}
