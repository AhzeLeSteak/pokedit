import {SaveType} from "../../data/SaveReader";
import {Gen1SaveReader} from "../../data/Gen1/Gen1SaveReader";
import {Pokemon} from "../../data/types/pokemon";
import party from './party.json';
import box_1 from './box_1.json';

type PokemonTest = typeof party[number];

describe('Gen 1 parsing', () => {

    const fs = require('fs');
    let save_file = fs.readFileSync('public/save/blue.sav');

    let save: SaveType;

    const testPokemonEqual = (pk: Pokemon, pk_test: PokemonTest) => {
        expect(pk.pokedex_id).toEqual(pk_test.species);
        if(pk.nickname != '')
            expect(pk.nickname).toEqual(pk_test.nickname);
        expect(pk.level).toEqual(pk_test.lvl);
        expect(pk.stats.atk).toEqual(pk_test.stats.atk);
        expect(pk.stats.def).toEqual(pk_test.stats.def);
        expect(pk.stats.atk_spe).toEqual(pk_test.stats.spe);
        expect(pk.stats.def_spe).toEqual(pk_test.stats.spe);
        expect(pk.stats.spd).toEqual(pk_test.stats.spd);
    }

    beforeEach(() => {
        const sr = new Gen1SaveReader(new Uint8Array(save_file), 'FR');
        save = sr.save;
    })

    it('should have correct player and rival names', () => {
        expect(save.player_name).toEqual('SAKURA');
        expect(save.rival_name).toEqual('SYAORAN');
    })

    it('should have 6 pokémons in party', () => {
        expect(save.party.length).toEqual(6);
        party.forEach((poke, i) => {
            testPokemonEqual(save.party[i], poke);
        })
    })

    it('box', () => {
        expect(save.boxes[0].length).toEqual(20);
        box_1.forEach((poke, i) => {
            testPokemonEqual(save.boxes[0][i], poke);
        })
    })

})
