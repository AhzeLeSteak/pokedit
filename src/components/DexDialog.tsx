import './DexDialog.scss';
import {SaveDataType} from "../data/AbstractSaveDataReader";
import React, {useEffect, useState} from "react";
import {NAMES} from "../data/NAMES";

let timeout: NodeJS.Timeout;

export const DexDialog = (props: {dex_info: SaveDataType['pokedex']}) => {

    const [visible, setVisible] = useState(false);
    const seen = props.dex_info.filter(dx => dx.seen).length;
    const owned = props.dex_info.filter(dx => dx.owned).length;

    useEffect(() => {
        document.querySelector('#sprites [data-pkid="1"]')?.scrollIntoView({block: "center"});
    }, [visible]);


    const scrollSprites = (ev: React.UIEvent<HTMLDivElement>) => {
        const target = ev.target as HTMLElement;
        const rect = target.getBoundingClientRect();
        const middle_y = rect.top + rect.height/2;

        const pokemon_elements = [].slice.call(target.children) as HTMLElement[];
        const select_element = pokemon_elements.find((el: HTMLElement) =>
            Math.abs(el.getBoundingClientRect().top + el.getBoundingClientRect().height/2 - middle_y) < 10
        )
        if(!select_element)
            return;
        const pk_id = select_element.dataset.pkid!;
        const names_div = document.getElementById('names')!;
        if(timeout)
            clearTimeout(timeout);
        timeout = setTimeout(() =>
            names_div
                .querySelector(`[data-pkid="${pk_id}"]`)
                ?.scrollIntoView({block: "center", behavior: 'smooth'}),
            500);
    }

    const scrollNames = (ev: React.UIEvent<HTMLDivElement>) => {
        const target = ev.target as HTMLElement;
        const rect = target.getBoundingClientRect();
        const middle_y = rect.top + rect.height/2;

        const pokemon_elements = [].slice.call(target.children) as HTMLElement[];
        const select_element = pokemon_elements.find((el: HTMLElement) =>
            Math.abs(el.getBoundingClientRect().top + el.getBoundingClientRect().height/2 - middle_y) < 10
        )
        if(!select_element)
            return;
        const pk_id = select_element.dataset.pkid!;
        const sprites_div = document.getElementById('sprites')!;
        if(timeout)
            clearTimeout(timeout);
        timeout = setTimeout(() =>
                sprites_div
                    .querySelector(`[data-pkid="${pk_id}"]`)
                    ?.scrollIntoView({block: "center", behavior: 'smooth'}),
            500);
    }

    const filler_names = Array(3).fill(0).map((_, i) =>
        <div style={{visibility: 'hidden'}}>
            <div><img className="ball" src={`${process.env.PUBLIC_URL}/imgs/poke.png`}/></div>
            <span>{NAMES[i].toUpperCase()}</span>
        </div>
    );
    const filler_sprites = <div className="flex justify-content-center align-content-center">
        <img style={{width: '100%', visibility: 'hidden'}} src={`${process.env.PUBLIC_URL}/icons/001.png`}/>
    </div>;

    return <>
        <button onClick={() => setVisible(v => !v)} id="dex_btn" />
        {visible &&
            <div id="dex-dialog" style={{'--rows': props.dex_info.length+1} as React.CSSProperties} className="poke-font">

                <span className="stat" id="seen">{seen}</span>
                <span className="stat" id="owned">{owned}</span>

                <div id="sprites" onScroll={scrollSprites}>
                    {filler_sprites}
                    {props.dex_info.map((_, i) =>
                        <div className="flex justify-content-center align-content-center" data-pkid={i+1}>
                            <img style={{width: '100%'}} src={`${process.env.PUBLIC_URL}/icons/${String(i+1).padStart(3, '0')}.png`}/>
                        </div>
                    )}
                    {filler_sprites}
                </div>

                <div id="names" onScroll={scrollNames}>
                    {filler_names}
                    {props.dex_info.map((_, i) => {
                            i+=1;
                            const fixed = String(i).padStart(3, '0');
                            const ball = _.owned ? 'pokeball' : 'noball';
                            return <div data-pkid={i}>
                                <div><img className="ball" src={`${process.env.PUBLIC_URL}/imgs/${ball}.png`}/></div>
                                <span>N°{fixed} {NAMES[i].toUpperCase()}</span>
                            </div>
                        })
                    }
                    {filler_names}
                </div>
            </div>
        }
    </>
}
