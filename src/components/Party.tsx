import './Party.css'
import {PokeCard} from "./PokeCard";
import {useSaveContext} from "../pages/SaveViewer";

export const Party = () => {

    const {save_reader} = useSaveContext();

    return <div className="party">
        {Array(6).fill(0).map((_, i) =>
            <PokeCard key={i} pokemon={save_reader.save.party[i]} location={`party|${i}`}/>
        )}
    </div>
}
