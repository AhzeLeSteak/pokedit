import {Pokemon} from "./PokeTypes";

export type SaveDataType = {
    player_name: string,
    rival_name: string,
    party: Pokemon[],
    boxes: Pokemon[][]
}

export abstract class AbstractSaveDataReader{

    abstract get_save_data() : SaveDataType;

}