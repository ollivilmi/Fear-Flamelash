const express = require("express");
const User = require("../models/user");
const router = express.Router();

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
    console.log(req.body);
    let user = new User(req.body);
    user.save((err, newImport) => {
      if (err) {
        console.log("Failed to post new data because ", err);
        return next(err);
      } else {
        res.status(200).send(newImport);
      }
    });
  });

module.exports = router;