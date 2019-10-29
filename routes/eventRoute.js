const express = require("express");
const Event = require("../models/eventModel");
const router = express.Router();

router.get("/", async (req, res) => {
    return res.status(200).json({message: "Events"});
});

router.post("/", async (req,res) => {
    return res.status(200).json({message: "Event added"});
})

module.exports = router;