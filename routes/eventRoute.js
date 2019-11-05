const express = require("express");
const Event = require("../models/eventModel");
const Character = require("../models/characterModel");
const router = express.Router();

router.get("/", async (req, res) => {
    const events = await Event.find().populate('character');

    return res.status(200).json({events});
});

router.post("/", async (req,res) => {
    if (req.user.role !== 'admin') {
        res.status(403);
        return;
    }

    new Event(req.body).save().then(() => {
        return res.status(200).json({message: "Event created"});
    })
    .catch(err => {
        return res.status(400).json({message: "Error creating event: " + err});
    })
})

router.get("/signup", async (req,res) => {
    const event = await Event.findById(req.query.eventId).populate("character");

    if (!event) {
        res.status(400).json({message: "Event not found"});
        return
    }

    res.status(200).json({signups: event.signups});
})

router.post("/signup", async (req, res) => {
    const character = await Character.findById(req.body.character);

    if (!character) {
        res.status(400).json({message: "Character not found"});
        return
    }

    signup = await Event.findOneAndUpdate(
        { _id: req.body.eventId, "signups.character": character}, {
        $set: {
            "signups.$": {character, status: req.body.status}
        }
    });

    if (!signup) {
        await Event.findByIdAndUpdate(req.body.eventId, {
            $push: { signups: {character, status: req.body.status}
            }
        });
    }

    res.status(200).json({message: "Signed up"});
})

module.exports = router;