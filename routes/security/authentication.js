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
        if (!user) return done(null, false);

        match = await bcrypt.compare(req.body.password, user.hash);

        if (!match) {
            return done(null, false)
        } else {
            return done(null, user);
        }
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET,
},
async function (token, done) {
        const user = await User.findById(token.user._id);

        if (!user || user.role === 'none'){
            return done(null, false);
        }
        return done(null, user);
    }
));
  
passport.use(new GoogleStrategy({
        clientID: process.env.GCLIENT_ID,
        clientSecret: process.env.GCLIENT_SECRET,
        callbackURL: process.env.GCALLBACK
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOneOrCreate({ googleId: profile.id, email: profile.emails[0].value }, function (err, user) {
            if (err) return done(err);
            return done(null, user);
        });
    })
);