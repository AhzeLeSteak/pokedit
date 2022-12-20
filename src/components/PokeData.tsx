import './PokeData.css'
import {useBoxContext} from "../App";
import {SPECIES} from "../data/Gen1/static-data";

export const PokeData = () => {

    const {pokemon} = useBoxContext();


    if(!pokemon)
        return <div className="poke-data"></div>;

    const species = String(pokemon.pokedex_id).padStart(3, '0');

    const stats = [
        [SPECIES[pokemon.pokedex_id], 'Lvl '+pokemon.level],
        ['XP', pokemon.exp],
        ['HP', `${pokemon.currentHp}/${pokemon.base_stats.hp}`],
        ['ATK', pokemon.base_stats.atk],
        ['DEF', pokemon.base_stats.def],
        ['SPE', pokemon.base_stats.atk_spe],
        ['SPD', pokemon.base_stats.spd]
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