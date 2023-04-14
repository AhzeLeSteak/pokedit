import {SaveReader} from "./SaveReader";
import {Pokemon} from "./types/pokemon";
import {read_n_bytes, read_string} from "./read_buffer";
import {Language} from "../firebase/types";
import {Location} from "./types/location";

export abstract class SaveReaderOffset<T extends {species: number, [K: string]: number}> extends SaveReader<T>{

    protected constructor(protected offset: Offset, protected bytes_in_poke: T,
                          protected max_pk_id: number,
                          buffer: Uint8Array, language: Language, ) {
        super(buffer, language);
    }

    calc_save_data () {
        return {
            player_name: read_string(this.buffer, this.offset.PLAYER_NAME, this.language, this.offset.MEMORY_SIZE.STRING_LENGTH),
            rival_name: read_string(this.buffer, this.offset.RIVAL_NAME, this.language, this.offset.MEMORY_SIZE.STRING_LENGTH),
            party: this.get_party_info(),
            boxes: this.get_boxes_info(),
            box_size: 20,
            pokedex: this.get_dex_info()
        }
    }

    protected get_boxes_info(): Pokemon[][]{
        return Array(12)
            .fill(0)
            .map((_, i) => this.get_box_info(i));
    }

    protected get_dex_info(){
        const dex_seen = this.get_dex_data(this.offset.POKEDEX.SEEN);
        const dex_owned = this.get_dex_data(this.offset.POKEDEX.OWNED);
        return dex_seen.map((seen, i) => ({
            seen,
            owned: dex_owned[i]
        }))
    }

    protected get_box_info(box_index: number) {
        const box_offset = this.get_box_offset(box_index);
        const poke_count = this.buffer[box_offset];

        return Array(poke_count).fill(0)
            .map((_, i) => (<Location>{location: 'box', box_index, pk_index: i}))
            .map(l => ({l, pk: this.get_from_location(l)}) )
            .map(({l, pk}) => this.convert_poke(pk, pk.nickname, pk.OT_name, l.location))
    }


    protected get_party_info(): Pokemon[] {
        const poke_count = this.buffer[this.offset.PARTY.OFFSET];
        return Array(poke_count).fill(0)
            .map((_, i) => (<Location>{location: 'party', pk_index: i}))
            .map(l => ({l, pk: this.get_from_location(l)}) )
            .map(({l, pk}) => this.convert_poke(pk, pk.nickname, pk.OT_name, l.location));
    }

    protected get_box_offset(box_index: number){
        let current_box_number = this.buffer[this.offset.CURRENT_BOX_NUMBER] % 2**7;
        return current_box_number === box_index
            ? this.offset.CURRENT_BOX
            : box_index < 6
                ? this.offset.BOX.BOX_1 + box_index * this.offset.MEMORY_SIZE.BOX
                : this.offset.BOX.BOX_7 + (box_index-6) * this.offset.MEMORY_SIZE.BOX;
    }

    override get_from_location(l: Location): T & {nickname: string, OT_name: string} {
        const [offset_pk, species_offset, offset_nickname, offset_OT_name] = this.get_offsets(l);
        const nickname = read_string(this.buffer, offset_nickname, this.language, this.offset.MEMORY_SIZE.STRING_LENGTH);
        const OT_name =  read_string(this.buffer, offset_OT_name, this.language, this.offset.MEMORY_SIZE.STRING_LENGTH);
        const species = read_n_bytes(this.buffer, species_offset, 1);
        return {
            ...this.get_poke_from_offset(offset_pk),
            species,
            nickname,
            OT_name
        }
    }

    set_box_pokes(box_index: number, pokes: T[]){
        super.set_box_pokes(box_index, pokes);
        const box_offset = this.get_box_offset(box_index);
        this.buffer[box_offset] = pokes.length;
        for(let i = pokes.length; i < this.save.box_size; i++)
            this.buffer[box_offset + this.offset.BOX.SPECIES + i] = 0;
    }



    get_offsets(l: Location): [number, number, number, number] {
        if(l.location === 'party')
            return [
                this.offset.PARTY.OFFSET + this.offset.PARTY.POKEMONS + l.pk_index * this.offset.MEMORY_SIZE.POKEMON_IN_PARTY,
                this.offset.PARTY.OFFSET + this.offset.PARTY.SPECIES + l.pk_index,
                this.offset.PARTY.OFFSET + this.offset.PARTY.POKEMON_NAMES + l.pk_index * this.offset.MEMORY_SIZE.STRING_LENGTH,
                this.offset.PARTY.OFFSET + this.offset.PARTY.OT_NAMES + l.pk_index * this.offset.MEMORY_SIZE.STRING_LENGTH
            ]

        const box_offset = this.get_box_offset(l.box_index);
        return [
            box_offset + this.offset.BOX.POKEMONS + l.pk_index * this.offset.MEMORY_SIZE.POKEMON_IN_BOX,
            box_offset + this.offset.PARTY.SPECIES + l.pk_index,
            box_offset + this.offset.BOX.SPECIES + l.pk_index,
            box_offset + this.offset.BOX.OT_NAMES + l.pk_index * this.offset.MEMORY_SIZE.STRING_LENGTH
        ]
    }

    private get_poke_from_offset(offset: number) {
        const poke = {...this.bytes_in_poke};
        for(const key in poke){
            const bytes = poke[key];
            // @ts-ignore
            poke[key] = read_n_bytes(this.buffer, offset, bytes);
            offset += bytes;
        }
        return poke;
    };

    protected change_location_size(l: Location, diff: number): void {
        const offset = l.location === 'box' ? this.get_box_offset(l.box_index) : this.offset.PARTY.OFFSET;
        this.buffer[offset] += diff;
    }

    protected get_dex_data(offset: number): boolean[] {
        return new Array(this.max_pk_id-1).fill(0)
            .map((_, i) => (this.buffer[offset + (i >> 3)] >> (i & 7) ) & 1)
            .map(val => !!val)
    }

    protected abstract convert_poke(poke: T, nickname: string, OT_name: string, location: Location['location']) : Pokemon
}


export type Offset = {
    PLAYER_NAME: number,
    RIVAL_NAME: number,
    CURRENT_BOX_NUMBER: number,
    CURRENT_BOX: number,
    BOX: {
        BOX_1: number,
        BOX_7: number,
        SPECIES: number,
        POKEMONS: number,
        POKEMON_NAMES: number,
        OT_NAMES: number

    },
    PARTY: {
        OFFSET: number,
        SPECIES: number,
        POKEMONS: number,
        POKEMON_NAMES: number,
        OT_NAMES: number
    },
    POKEDEX:{
        OWNED: number,
        SEEN: number
    },
    CHECKSUM: {
        MAIN_DATA: number,
        BANK_2: number,
        BANK_3: number,
    },
    MEMORY_SIZE: {
        STRING_LENGTH: number,
        BOX: number,
        POKEMON_IN_BOX: number,
        POKEMON_IN_PARTY: number
    }
}
