const mocha = require('mocha')
const assert = require('assert')
const mongoose = require('mongoose')
const User = require("../models/userModel");

describe('Creates a user in users collection', () => {
    let testUser;

    beforeEach(async function() {
        testUser = new User({email: "testEmail@gmail.com", hash: "test"});
        await testUser.save();
        done();
    });

    it('Finds user by id', async function() {

        user = await User.findOne({_id: testUser._id});
        console.log(user);
        assert(user_id.toString() === testUser._id.toString());
        done();

    });

    it('Removes user', async function() {

        await User.deleteOne({email: "testEmail@gmail.com"});
        user = await User.findOne({_id: testUser._id});

        console.log(user);
        assert(!user);
        done();

    });



});