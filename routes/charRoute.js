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
    return res.status(400).json({message: "error creating character (already exists)"});
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
  const character = await Character.findById(req.user.character);
  if (!character) {
    res.status(400).json({message: "No character found"});
    return;
  }

  return res.status(200).json({character});
});

router.get("/all", async (req, res) => {
  const characters = await Character.find({priority: { $gt: 0 }},'name class role ep gp priority');
  return res.status(200).json(characters);
})

router.post("/import", async (req, res) => {
  if (req.user.role !== 'admin') {
    res.status(403);
    return
  }

  if (!req.files) {
    res.status(400).json({message: "Invalid request. Import file required."})
    return
  }

  const data = req.files.file.data
  const characters = readCharacterData(data);

  const promises = characters.map(character => {
    return Character.findOne({
      name: character.name
    }, (err, characterInDB) => {
      if (err) {
        console.log(err);
      } else {

        if (characterInDB) {
          // Check to avoid unnecessary updates
          if (charIsUpdated(character, characterInDB)) {
            characterInDB.overwrite(character);
            characterInDB.save();
          }

        } else {
          new Character(character).save();
        }
      }
    })
  })

  Promise.all(promises)
  .then(() => {
    res.status(200).json({message: "File received and processed"})
  })
  .catch(err => {
    console.log(err);
    res.status(400).json({message: "Internal error: " + err});
  })
})

const readCharacterData = data => {
  const lines = data.toString('utf8', 0, data.length).split(/\n/);
  
  return lines.reduce((result, line) => {
    const fields = line.split(',');
    // ignore invalid names (might be empty)
    if (!fields[0] || fields[0].length === 0) {
      return result
    }

    // wrapped in try block in for parseInt errors
    try {
      result.push({
        name: fields[0],
        class: fields[1],
        rank: fields[2],
        ep: parseInt(fields[3] || '0'),
        gp: parseInt(fields[4] || '0'),
        priority: parseInt(fields[5] || '0')
      });
    }
    finally {
      return result
    }
  }, []);
}

charIsUpdated = (character, characterInDB) => {
  return (
    character.ep !== characterInDB.ep ||
    character.gp !== characterInDB.gp ||
    character.priority !== characterInDB.priority
  )
}

module.exports = router;