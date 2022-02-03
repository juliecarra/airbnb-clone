const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const bcrypt = require("bcrypt");
const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//IN POSTAMAN "email": "value of mobile or email "
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done, next) => {
      try {
        const user = await User.findOne({
          $or: [{ email: email }, { phoneNumber: email }],
        });

        if (!user) {
          return done(null, false, {
            message:
              "This e-mail address or phone number doesn't have an associated user account. Are you sure you've registered?",
          });
        }

        if (!bcrypt.compare(password, user.password)) {
          return done(null, false, { message: "Invalid password." });
        }

        done(null, user);
      } catch (error) {
        next(error);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    },
    async (req, payload, done) => {
      try {
        const user = await User.findById(payload._id);
        if (user) {
          req.user = user;
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        next(error);
      }
    }
  )
);
