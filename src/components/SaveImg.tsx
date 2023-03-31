import {Version} from "../firebase/types";
import React from "react";

const species: Record<Version, string> = {
    yellow: '025',
    red: '006',
    blue: '009'
}

export const SaveImg = (props: {version: Version, width ?: string}) => {
    return <img style={{width: props.width || '100%'}} src={`${process.env.PUBLIC_URL}/icons/${species[props.version]}.png`}/>
}
