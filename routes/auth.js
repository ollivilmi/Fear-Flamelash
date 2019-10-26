const express = require("express");
const router = express.Router();

const passport = require('passport')
const jwt = require('jsonwebtoken')

router.post("/",
  passport.authenticate('local', { session: false }), (req, res) => {
    
    jwt.sign({user: req.user}, process.env.JWT_SECRET, (err, token) => {
      res.json({
        token
      });
    });
})

router.get('/google',
  passport.authenticate('google', { scope: ['profile'] })
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