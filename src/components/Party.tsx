import './Party.css'
import {PokeCard} from "./PokeCard";
import {useSaveContext} from "../pages/SaveViewer";

export const Party = () => {

    const {save_reader} = useSaveContext();

    return <div className="party">
        {save_reader.save.party.map((pk, i) => <PokeCard key={i} pokemon={pk}/>)}
    </div>
}
