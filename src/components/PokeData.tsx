import './PokeData.css'
import {useBoxContext} from "../App";
import {SPECIES} from "../data/Gen1/static-data";

export const PokeData = () => {

    const {selected_pokemon} = useBoxContext();


    if(!selected_pokemon)
        return <div className="poke-data"></div>;

    const species = String(selected_pokemon.pokedex_id).padStart(3, '0');

    const stats = [
        [SPECIES[selected_pokemon.pokedex_id], 'Lvl '+selected_pokemon.level],
        ['XP', selected_pokemon.exp],
        ['HP', `${selected_pokemon.currentHp}/${selected_pokemon.base_stats.hp}`],
        ['ATK', selected_pokemon.base_stats.atk],
        ['DEF', selected_pokemon.base_stats.def],
        ['SPE', selected_pokemon.base_stats.atk_spe],
        ['SPD', selected_pokemon.base_stats.spd]
    ]

    return <div className="poke-data">
        <div className="poke-img">
            <img src={`${process.env.PUBLIC_URL}/icons/${species}.png`} className="cursor-pointer"/>
        </div>
        <div className="poke-stats poke-font">
            {stats.map(s => <div className="flex justify-content-between">
                <span>{s[0]}</span>
                <span>{s[1]}</span>
            </div>)}
        </div>
    </div>
}