import {Location, Pokemon} from "./PokeTypes";

export interface SaveType {
    player_name: string,
    rival_name: string,
    party: Pokemon[],
    boxes: Pokemon[][],
    pokedex: {
        seen: boolean,
        owned: boolean,
    }[]
}

export abstract class SaveReader {

    protected _save!: SaveType;


    protected abstract calc_save_data(): SaveType;

    public get save(){
        if(!this._save)
            this.update();
        return this._save;
    }

    public update(){
        this._save = this.calc_save_data();
    }

    public abstract swap(l1: Location, l2: Location): void;


}
