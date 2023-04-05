import {Version} from "../firebase/types";
import React from "react";

const species: Record<Version, string> = {
    yellow: 'pikachu',
    red: 'charizard',
    blue: 'blastoise',
    green: 'venusaur',
    silver: 'lugia',
    gold: 'ho-oh',
    cristal: 'suicune',
}

export const SaveImg = (props: {version: Version, width ?: string}) => {
    return <img style={{width: props.width || '100%'}} src={`${process.env.PUBLIC_URL}/icons/${species[props.version]}.png`}/>
}
