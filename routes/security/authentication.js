const passport = require('passport')
const User = require("../../models/userModel");

const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;

const JWTStrategy   = passportJWT.Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, 
  async function (req, name, password, done) {
        user = await User.findOne({email: req.body.email});
        if (!user) return done("email not found");

        match = await bcrypt.compare(req.body.password, user.hash);

        if (!match) {
            return done("invalid password")
        } else {
            return done(null, user);
        }
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET
},
function (token, done) {
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