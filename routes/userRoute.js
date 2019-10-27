const express = require("express");
const User = require("../models/userModel");
const router = express.Router();
const verifyToken = require('./security/token')

router.get("/", (req, res, next) => {
    User.find(
      {},
      null,
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

router.delete("/", (req, res, next) => {
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

module.exports = router;