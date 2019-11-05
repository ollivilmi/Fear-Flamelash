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
  user.save((err, user) => {
    if (err) {
      res.status(400).json({message: "Email already taken"});
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
  if (req.body.referral === process.env.MEMBER_REFERRAL) {
    user = await User.findByIdAndUpdate(req.body.id,{role: "member"});
  } else if (req.body.referral === process.env.ADMIN_REFERRAL) {
    user = await User.findByIdAndUpdate(req.body.id,{role: "admin"});
  } else {
    return res.status(400).json({message: "Invalid referral"});
  }
    
  if (user.nModified === 0) {
    return res.status(400).json({messsage: "Error: could not update user"});
  }
  return res.status(200).json({message: "User promoted", role: user.role});
});

module.exports = router;