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
      profile: {
        email: req.user.email,
        role: req.user.role,
        id: req.user._id,
      }
    });
})

router.post("/register", async(req, res, next) => {
  const hash = await bcrypt.hash(req.body.password, saltRounds);

  let user = new User({
    email: req.body.email,
    hash,
    role: 'none'
  });
  user.save(err => {
    if (err) {
      res.status(400).json({message: "Email already taken"});
    } else {
      res.status(200).json({message: "User created!"});
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
         "profile": JSON.stringify({
          email: req.user.email,
          role: req.user.role,
          id: req.user._id,
        }),
       }
      })
    );
});

router.post("/referral", async (req, res) => {
  let role;

  if (req.body.referral === process.env.MEMBER_REFERRAL) {
    role = "member";
    user = await User.findByIdAndUpdate(req.body.id,{role});
  } 
  else if (req.body.referral === process.env.ADMIN_REFERRAL) {
    role = "admin";
    user = await User.findByIdAndUpdate(req.body.id,{role});
  } else {
    res.status(400).json({message: "Invalid referral"});
    return
  }
    
  if (user.nModified === 0) {
    res.status(400).json({messsage: "Error: could not update user"});
    return
  }

  res.status(200).json(
    {
      message: "User promoted",
      profile: {
        email: user.email,
        role,
        id: user._id,
      }
  });
});

module.exports = router;