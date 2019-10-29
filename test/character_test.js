const assert = require('assert')
const Character = require("../models/characterModel");

describe('Characters CRUD tests', () => {
    let testChar;

    beforeEach(async() => {
        await Character.deleteMany();

        testChar = new Character({name: "testchar", class: "warrior", role: "tank"});
        return testChar.save();
    });

    it('Finds character by id', async() => {
        char = await Character.findOne({_id: testChar._id})
        assert(char.toString() === testChar.toString());
    });
});