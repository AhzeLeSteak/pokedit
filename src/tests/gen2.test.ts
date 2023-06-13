import {SaveType} from "../data/SaveReader";
import {Gen2SaveReader} from "../data/Gen2/Gen2SaveReader";


describe('Gen 2 parsing', () => {

    const fs = require('fs');
    let save_file = fs.readFileSync('public/save/gold.sav');

    let save: SaveType;

    beforeEach(async () => {
        const sr = new Gen2SaveReader(new Uint8Array(save_file), 'FR', 'gold');
        save = sr.save;
    })

    it('should have 6 pokémons in party', () => {
        expect(save.party.length).toEqual(6);
    })

})
