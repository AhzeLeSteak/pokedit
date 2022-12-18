import './PokeData.css'
import {useBoxContext} from "../App";
import {SPECIES} from "../data/static-data";

export const PokeData = () => {

    const {pokemon} = useBoxContext();


    if(!pokemon)
        return <div className="poke-data"></div>;

    const species = String(pokemon.species).padStart(3, '0');

    const stats = [
        [SPECIES[pokemon.species], 'Lvl '+pokemon.level],
        ['HP', `${pokemon.currentHp}/${pokemon.maxHP}`],
        ['ATK', pokemon.atk],
        ['DEF', pokemon.def],
        ['SPE', pokemon.spe],
        ['SPD', pokemon.spd]
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