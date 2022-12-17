import React, {useMemo} from "react";
import {PokeCard} from "./data/PokeCard";

const index20 = Array(20).fill(0).map((_, i) => i);

export function Box(props: {boxIndex: number, buffer: Uint8Array}){

    const {boxIndex, buffer} = props;

    const boxOffset = useMemo(() => boxIndex < 6 ? 0x4000 + boxIndex * 0x462 : 0x6000 + (boxIndex-6)*0x462, [boxIndex]);

    return <div className="grid">
        {index20.map(i => <div className="col-2">
            <PokeCard offset={boxOffset + 0x16 + i*0x21} buffer={buffer}/>
        </div>)}
    </div>
}
