import './DexDialog.scss';
import {SaveDataType} from "../data/AbstractSaveDataReader";
import React, {useState} from "react";
import {NAMES} from "../data/NAMES";

export const DexDialog = (props: {dex_info: SaveDataType['pokedex']}) => {

    const [visible, setVisible] = useState(true);

    const handleScroll = (ev: React.UIEvent<HTMLDivElement>) => {
        ev.stopPropagation();
        ev.preventDefault();
    }

    return <>
        <button onClick={() => setVisible(true)} id="dex_btn" />
        {visible &&
            <div id="dex-dialog" style={{'--rows': props.dex_info.length+1} as React.CSSProperties} className="poke-font">
                <div id="names" onScroll={handleScroll}>
                    {props.dex_info.map((_, i) => {
                        i+=1;
                        const fixed = String(i).padStart(3, '0');
                        const ball = _.owned ? 'pokeball' : 'honorball';
                        return <div>
                            <div><img className="ball" src={`${process.env.PUBLIC_URL}/imgs/${ball}.png`}/></div>
                            <span>N°{fixed} {NAMES[i].toUpperCase()}</span>
                        </div>;
                    })}
                </div>
            </div>
        }
    </>
}