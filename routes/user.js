const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/", (req, res, next) => {
    User.find(
      {},
      'name ep gp',
      {
        sort: { createdAt: -1 }
      },
      (err, docs) => {
        if (err) {
          return next(err);
        } else {
          res.status(200).json(docs);
        }
      }
    );
});

router.post("/", (req, res, next) => {
    let user = new User(req.body);
    user.save((err, newImport) => {
      if (err) {
        console.log("Failed to post new user because ", err);
        return next(err);
      } else {
        res.status(200).send(newImport);
      }
    });
});

router.delete("/", (req, res, next) => {
  User.deleteOne({ name: req.body.name }, (err) => {
    if (err) {
      console.log("Failed delete user because ", err);
      return next(err);
    } else {
      res.status(200).send('deleted ' + req.body.name);
    }
  });
});

router.put("/", (req, res, next) => {
  const user = new User(req.body);

  User.updateOne({ name: user.name },{ ep: user.ep, gp: user.gp }, (err) => {
    if (err) {
      console.log("Failed to update user because ", err);
      return next(err);
    } else {
      res.status(200).send('Updated ' + user.name);
    }
  });
});

module.exports = router;