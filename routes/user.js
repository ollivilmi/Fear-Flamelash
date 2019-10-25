const express = require("express");
const User = require("../models/user");
const router = express.Router();
const jwt = require('jsonwebtoken')
const verifyToken = require('./token')

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
        return next(err);
      } else {
        res.status(200).send(newImport);
      }
    });
});

router.delete("/", verifyToken, (req, res, next) => {
  User.deleteOne({ name: req.body.name }, (err) => {
    if (err) {
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
      return next(err);
    } else {
      res.status(200).send('Updated ' + user.name);
    }
  });
});

router.post("/login", (req, res) => {
  // testing
  console.log(req.body);

  User.findOne(
    {name: req.body.name, hash: req.body.hash},
    null,
    (err, user) => {
      if (err) {
        res.status(400);
      } else {
        console.log(user);

        jwt.sign({user}, process.env.JWT_SECRET, (err, token) => {
          res.json({
            token
          });
        });
      }
    }
  );
})

module.exports = router;