import './Party.css'

import {SaveDataType} from "../data/AbstractSaveDataReader";
import {PokeCard} from "./PokeCard";

export const Party = ({save_data}: {save_data: SaveDataType}) => {


    return <div className="party">
        {save_data.party.map((pk, i) => <PokeCard key={i} pokemon={pk}/>)}
    </div>
}