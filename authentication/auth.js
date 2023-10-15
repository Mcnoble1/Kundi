require('dotenv').config()
const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


const userOptions = {
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() 
};

const adminOptions = {
    secretOrKey: process.env.ADMIN_SECRET_KEY,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
};




passport.use("user-jwt",
    new JWTstrategy(
        userOptions,
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use("admin-jwt",
    new JWTstrategy(
        adminOptions,
        async (token, done) => {
            try {
                return done(null, token.admin);
            } catch (error) {
                done(error);
            }
        }   
    )
);



