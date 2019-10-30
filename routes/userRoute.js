const express = require("express");
const User = require("../models/userModel");
const Character = require("../models/characterModel");
const router = express.Router();

router.post("/linkCharacter", async (req, res) => {
  const character = await Character.findOne({name: req.body.name});
  User.findByIdAndUpdate(req.user._id,{character}).then(() => {
    return res.status(200).json({message: "character linked"});
  }).catch(() => {
    return res.status(400).json({message: "error linking character"});
  });
});

router.delete("/linkCharacter", async (req,res) => {
  User.findByIdAndUpdate(req.user._id,{$unset: {character: ""}}).then(() => {
    return res.status(200).json({message: "character unlinked"});
  }).catch(() => {
    return res.status(400).json({message: "error removing character from user"});
  });
})

router.get("/", async (req,res) => {
  res.json({
      email: req.user.email,
      role: req.user.role,
      id: req.user._id,
  });
});


module.exports = router;