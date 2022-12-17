import React, {useMemo} from "react";
import {getPoke} from "./getPoke";
import {Card} from "primereact/card";
import {SPECIES} from "./static-data";

export function PokeCard(props: {offset: number, buffer: Uint8Array}){

    const poke = useMemo(() => getPoke(props.buffer, props.offset), [props.offset, props.buffer]);

    return <Card title={SPECIES[poke.species]} subTitle={`Lvl ${poke.level}`}>
        {props.offset.toString(16)}
    </Card>
}
