import {Pokemon} from "./PokeTypes";

export interface SaveDataType {
    player_name: string,
    rival_name: string,
    party: Pokemon[],
    boxes: Pokemon[][],
    pokedex: {
        seen: boolean,
        owned: boolean,
    }[]
}

export abstract class AbstractSaveDataReader{

    abstract get_save_data() : SaveDataType;

}