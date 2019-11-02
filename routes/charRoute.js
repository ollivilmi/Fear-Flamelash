const express = require("express");
const User = require("../models/userModel");
const Character = require("../models/characterModel");
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router.post("/", async (req, res) => {
  const character = new Character(req.body);

  character.save().then(() => {
    return res.status(200).json({message: "character created"});
  }).catch(() => {
    return res.status(400).json({message: "error creating character"});
  });
})

router.delete("/", async (req, res) => {
  Character.findOneAndDelete(req.body.name).then(() => {
    return res.status(200).json({message: "character deleted"});
  }).catch(() => {
    return res.status(400).json({message: "error deleting character"});
  });
})

router.get("/", async (req, res) => {
  const fullUser = await User.findById(req.user._id).populate('character');
  return res.status(200).json({character: fullUser.character});
});

router.get("/all", async (req, res) => {
  const characters = await Character.find({},'name class role ep gp priority');
  return res.status(200).json(characters);
})

router.post("/import", upload.array(), async (req, res) => {
  if (req.user.role !== 'admin') {
    res.status(403);
  }
  console.log(req.files);

})

module.exports = router;