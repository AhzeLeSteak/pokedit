import './BaseInfo.scss'
import {Pokemon} from "../../data/types/pokemon";
import React from "react";

export const BaseInfo = ({poke}: { poke: Pokemon }) => {


    return <div className="tab-content base-tab">
        <div className="profile poke-font">
            <div className="first-line">
                <span> OT/<span style={{color: 'red'}}>{poke.OT_name}</span></span>
                <span> {poke.OT_id ? <>ID No/{poke.OT_id}</> : <></>}</span>
            </div>
            <div className="second-line">
                <span>TYPE/</span>
                {poke.types.map(type =>
                    <img alt="" key={type} className="type-badge" src={process.env.PUBLIC_URL + '/types/' + type.toLowerCase() + '.png'}/>)}
            </div>
        </div>
    </div>
};
