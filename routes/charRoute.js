const express = require("express");
const User = require("../models/userModel");
const Character = require("../models/characterModel");
const router = express.Router();
// const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })

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
  const characters = await Character.find({priority: { $gt: 0 }},'name class role ep gp priority');
  return res.status(200).json(characters);
})

router.post("/import", async (req, res) => {
  if (req.user.role !== 'admin') {
    res.status(403);
  }
  const data = req.files.file.data

  const csv = data.toString('ascii', 0, data.length).split(/\n/);
  csv.map(line => {
    const fields = line.split(',');

    const character = {
      name: fields[0],
      class: fields[1],
      rank: fields[2],
      ep: fields[3],
      gp: fields[4],
      priority: fields[5]
    }

    // Validate that the line contained a character
    // Could use filter but do not want to loop array
    if (character && character.name.length > 0) {

      Character.findOne({
        name: character.name
      }, (err, characterInDB) => {
        if (err) {
          console.log(err);
        } else {
          if (characterInDB) {
            characterInDB.update({character});
          } else {
            new Character(character).save();
          }
        }
      })
    }
  })
  res.status(200).json({message: "File received and processed"});
})

module.exports = router;