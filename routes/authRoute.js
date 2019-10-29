const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const passport = require('passport')
const jwt = require('jsonwebtoken')

const url = require('url');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post("/",
  passport.authenticate('local', { session: false }), (req, res) => {
    token = jwt.sign({user: req.user}, process.env.JWT_SECRET);
    res.json({
      token,
      profile: req.user
    });
})

router.post("/register", async(req, res, next) => {
  const hash = await bcrypt.hash(req.body.password, saltRounds);

  let user = new User({
    email: req.body.email,
    hash,
    role: 'none'
  });
  user.save((err, user) => {
    if (err) {
      console.log(err);
      res.status(400).json({message: "Email already exists"});
    } else {
      jwt.sign({user}, process.env.JWT_SECRET, (err, token) => {
        res.status(200).json({message: "User created!"});
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

    res.redirect(url.format({
      pathname:"/",
      query: {
         "token": token,
         "profile": JSON.stringify(req.user),
       }
      })
    );
});


module.exports = router;