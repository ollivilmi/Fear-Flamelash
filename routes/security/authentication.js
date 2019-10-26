const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require("../../models/user");

const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;

const JWTStrategy   = passportJWT.Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'hash',
    passReqToCallback: true
  }, 
  function (req, name, hash, done) {
    User.findOne({email: req.body.email, hash: req.body.hash}, (err, user) => {
            if (err) return done(err);
            return done(null, user);
        });
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET
},
function (token, done) {
    console.log(token);

    User.findOne({name: token.name}, (err, user) => {
            if (err) return done(err);
            return done(null, user);
        });
    }
));
  
passport.use(new GoogleStrategy({
        clientID: process.env.GCLIENT_ID,
        clientSecret: process.env.GCLIENT_SECRET,
        callbackURL: 'http://localhost:8080/api/auth/googleCallBack'
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOneOrCreate({ googleId: profile.id, email: profile.emails[0].value }, function (err, user) {
            if (err) return done(err);
            return done(null, user);
        });
    })
);