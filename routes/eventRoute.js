const express = require("express");
const Event = require("../models/eventModel");
const router = express.Router();

router.get("/", async (req, res) => {
    const events = await Event.find();

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

module.exports = router;