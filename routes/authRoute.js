const express = require("express");
const router = express.Router();

const User = require("../models/user");
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.post("/",
  passport.authenticate('local', { session: false }), (req, res) => {
    console.log(req.user);
    jwt.sign({user: req.user}, process.env.JWT_SECRET, (err, token) => {
      res.json({
        token
      });
    });
})

router.post("/register", (req, res, next) => {
  let user = new User(req.body);
  user.save((err, newImport) => {
    if (err) {
      return next(err);
    } else {
      res.status(200).send(newImport);
    }
  });
});

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/googleCallBack',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    console.log(req.user);

    jwt.sign({user: req.user}, process.env.JWT_SECRET, (err, token) => {
      res.json({
        token
      });
    });
});


module.exports = router;