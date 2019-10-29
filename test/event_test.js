const assert = require('assert');
const Event = require("../models/eventModel");
const Character = require("../models/characterModel");
const moment = require("moment");

describe('Events CRUD tests', () => {
    let testEvent;

    beforeEach(async() => {
        await Event.deleteMany();
        await Character.deleteMany();

        testEvent = new Event({
            name: "Molten Core", 
            description: "kill ragnaros", 
            start: moment().add(1, 'days'),
            end: moment().add(1, 'days').add(3, 'hours')
        });
        return testEvent.save();
    });

    it('Finds Event by id', async() => {
        event = await Event.findOne({_id: testEvent._id})
        assert(event.toString() === testEvent.toString());
    });

    it('Autopopulates signup character', async() => {
        testChar = new Character({name: "testchar", class: "warrior", role: "tank"});
        
        await testChar.save();
        await Event.updateOne({_id: testEvent._id}, { 
            $push: { signups: {character: testChar, status: "accepted"}
                }
            }
        );
        event = await Event.findOne({_id: testEvent._id}).populate('character');

        assert(event.signups[0].character.toString() === testChar.toString());
    });
});