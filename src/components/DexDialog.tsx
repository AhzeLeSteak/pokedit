import './DexDialog.scss';
import {SaveType} from "../data/SaveReader";
import React, {useEffect, useRef} from "react";
import {NAMES} from "../data/static-data/names";
import {useClickOutside} from "primereact/hooks";

let timeout: NodeJS.Timeout;

type DexDialogProps = {visible: boolean, onClose: Function, dex_info: SaveType['pokedex']};
export const DexDialog = ({visible, onClose, dex_info}: DexDialogProps) => {

    const dialogRef = useRef(null);

    const seen = dex_info.filter(dx => dx.seen).length;
    const owned = dex_info.filter(dx => dx.owned).length;

    useEffect(() => {
        setTimeout(() => document.querySelector('#sprites [data-pkid="1"]')?.scrollIntoView({block: "center"}), 1);
    }, [visible]);

    useClickOutside(dialogRef, onClose);

    const get_pkid_from_scrollbar = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect();
        const middle_y = rect.top + rect.height/2;

        const pokemon_elements = [].slice.call(el.children) as HTMLElement[];
        const select_element = pokemon_elements.find((el: HTMLElement) =>
            Math.abs(el.getBoundingClientRect().top + el.getBoundingClientRect().height/2 - middle_y) < 10
        )
        return select_element ? select_element.dataset.pkid! : false;
    }

    const handleScroll = (ev: React.UIEvent<HTMLDivElement>, otherScrollbar: 'names' | 'sprites') => {
        const pk_id = get_pkid_from_scrollbar(ev.target as HTMLElement);
        if(!pk_id) return;
        const scrollbar = document.getElementById(otherScrollbar)!;
        clearTimeout(timeout);
        timeout = setTimeout(() =>
            scrollbar
                .querySelector(`[data-pkid="${pk_id}"]`)
                ?.scrollIntoView({block: "center", behavior: 'smooth'}),
            500);
    }

    return <>
        {visible &&
            <div id="dex-dialog" ref={dialogRef} className="poke-font">
                <i onClick={() => onClose()} id="close-btn" className="pi pi-times"></i>
                <span className="stat" id="seen">{seen}</span>
                <span className="stat" id="owned">{owned}</span>

                <div id="sprites" onScroll={e => handleScroll(e, 'names')}>
                    {filler_sprites}
                    {dex_info.map((_, i) =>
                        <div className="flex justify-content-center align-content-center" data-pkid={i+1}>
                            <img style={{width: '100%'}} src={`${process.env.PUBLIC_URL}/icons/${NAMES[i+1]}.png`}/>
                        </div>
                    )}
                    {filler_sprites}
                </div>

                <div id="names" onScroll={e => handleScroll(e, 'sprites')}>
                    {filler_names}
                    {dex_info.map((_, i) => {
                            i+=1;
                            const fixed = String(i).padStart(3, '0');
                            const ball = _.owned ? 'pokeball' : 'noball';
                            return <div data-pkid={i} onClick={e => e.currentTarget.scrollIntoView({block: "center", behavior: 'smooth'})}>
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


const filler_names = Array(3).fill(0).map((_, i) =>
    <div style={{visibility: 'hidden'}}>
        <div><img className="ball" src={`${process.env.PUBLIC_URL}/imgs/poke.png`}/></div>
        <span>{NAMES[i].toUpperCase()}</span>
    </div>
);
const filler_sprites = <div className="flex justify-content-center align-content-center">
    <img style={{width: '100%', visibility: 'hidden'}} src={`${process.env.PUBLIC_URL}/icons/abra.png`}/>
</div>;
