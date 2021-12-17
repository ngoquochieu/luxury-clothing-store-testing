const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalJwtStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');

const {JWT_SECRET_KEY} = require('../config/index');

const User = require('../models/users');

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: "JWT_SECRET_KEY"
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);

        if(!user) return done(null, false);

        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

passport.use(new LocalJwtStrategy({
    usernameField:'userPhone'
}, async (userPhone, password, done) => {
   try {
        const user = await User.findOne({userPhone});

        if(!user) return done(null, false);

        const isCorrectPassword = await user.isValidPassword(password);

        if(!isCorrectPassword) return done(null, false);
        done(null, user);
   } catch (error) {
       done(error, false)
   }
}))
