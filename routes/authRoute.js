const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.post("/",
  passport.authenticate('local', { session: false }), (req, res) => {
    token = jwt.sign({user: req.user}, process.env.JWT_SECRET);
    res.json({
      token,
      user: req.user
    });
})

router.post("/register", (req, res, next) => {
  let user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      console.log(err);
      res.status(400).send("Email already exists");
    } else {
      jwt.sign({user}, process.env.JWT_SECRET, (err, token) => {
        res.json({
          token,
          user
        });
      });
    }
  });
});

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/googleCallBack',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    token = jwt.sign({user: req.user}, process.env.JWT_SECRET);
    res.json({
      token,
      user: req.user
    });
});


module.exports = router;