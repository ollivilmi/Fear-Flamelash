const assert = require('assert')
const User = require("../models/userModel");
const Character = require("../models/characterModel");
const database = require("../database/config");

describe('Creates a user in users collection', () => {
    let testUser;

    before(() => {
        database.connect(process.env.MONGO_DB_TEST);
    })

    beforeEach(async() => {
        await User.deleteMany();
        await Character.deleteMany();

        testUser = new User({email: "testEmail@gmail.com", hash: "test"});
        return testUser.save();
    });

    after(() => {
        database.disconnect();
    })

    it('Finds user by id', async() => {
        user = await User.findOne({_id: testUser._id})
        assert(user._id.toString() === testUser._id.toString());
    });

    it('Removes user', async() => {
        await User.deleteOne({email: "testEmail@gmail.com"});

        user = await User.findOne({_id: testUser._id});
        assert(!user);
    });

    it('Updates user', async() => {
        await User.updateOne({_id: testUser._id},{email: "stillaTester@gmail.com"});
        user = await User.findOne({email: "stillaTester@gmail.com"})
        assert(user);
    })

    it('Autopopulates user character', async() => {
        const character = new Character({ name: "Tester", class: "warrior", role: "tank"});

        await character.save();
        await User.updateOne({_id: testUser._id},{character});
        user = await User.findOne({_id: testUser._id}).populate('character');

        assert(user.character.toString() === character.toString());
    })
});