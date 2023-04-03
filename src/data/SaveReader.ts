import {Location, Pokemon} from "./PokeTypes";
import {Language} from "../firebase/types";

export interface SaveType {
    player_name: string,
    rival_name: string,
    party: Pokemon[],
    boxes: Pokemon[][],
    box_size: number,
    pokedex: Array<{
        seen: boolean,
        owned: boolean,
    }>
}

export abstract class SaveReader<TPkGen = {}> {

    protected _save!: SaveType;

    constructor(public readonly buffer: Uint8Array, public readonly language: Language) {
    }

    protected abstract calc_save_data(): SaveType;

    public get save(){
        if(!this._save)
            this.update();
        return this._save;
    }

    public update(){
        this._save = this.calc_save_data();
    }

    protected abstract get_from_location(l: Location): TPkGen;
    protected abstract set_from_location(l: Location, poke: TPkGen): void;
    protected abstract dex_id(poke: TPkGen): number;

    protected set_box_pokes(box_index: number, pokes: TPkGen[]){
        for(let i = 0; i < pokes.length; i++)
            this.set_from_location({location: "box", box_index, pk_index: i}, pokes[i]);
    }

    public swap(l1: Location, l2: Location){
        if(l1 === l2) return;
        const p1 = this.get_from_location(l1);
        const p2 = this.get_from_location(l2);
        this.set_from_location(l1, p2);
        this.set_from_location(l2, p1);
        this.update()
    }

    transfer(from: Location, to: Location, update = true) {
        const poke = this.get_from_location(from);
        this.set_from_location(to, poke);
        this.change_size(to, 1);
        this.remove_from_location(from);
        update && this.update();
    }

    remove_from_location(where: Location){
        const to = where.location === 'box' ? this.save.box_size : 6;
        for(let i = where.pk_index; i + 1 < to; i++)
            this.set_from_location({...where, pk_index: i}, this.get_from_location({...where, pk_index: i+1}));

        this.change_size(where, -1);
    }

    abstract change_size(l: Location, diff: number): void;

    protected get flat_mons(){
        const res: TPkGen[] = [];
        for(let box_index = 0; box_index < this.save.boxes.length; box_index++){
            const box = this._save.boxes[box_index];
            for(let pk_index = 0; pk_index < box.length; pk_index++)
                res.push(this.get_from_location({location: 'box', box_index, pk_index}));
        }
        return res;
    }

    sort(compareFn: (a: TPkGen, b: TPkGen) => number = (a, b) => this.dex_id(a) > this.dex_id(b) ? 1 : -1) {
        const mons = this.flat_mons.sort(compareFn);
        for(let i = 0; i < this.save.boxes.length; i++)
            this.set_box_pokes(i, mons.slice(i*this.save.box_size, (i+1)*this.save.box_size));
        this.update();
    }
}
