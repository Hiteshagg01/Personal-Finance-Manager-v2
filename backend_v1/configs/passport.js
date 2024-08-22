import "dotenv/config";

import passport from "passport";
import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oauth20";
import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import { Op } from "sequelize";

passport.use(
  "local-login",
  new LocalStrategy(async (username, password, cb) => {
    try {
      const foundUser = await User.findOne({
        attributes: {
          exclude: ["createdAt, updatedAt"],
        },
        where: {
          username,
        },
      });

      if (!foundUser) {
        return cb(null, false, {
          message: "Username and password does not match, Try Again",
        });
      } else {
        bcrypt.compare(password, foundUser.password, (error, same) => {
          if (error) {
            return cb(error);
          } else if (same) {
            return cb(null, { ...foundUser.toJSON(), password: null });
          } else {
            return cb(null, false, {
              message: "Username and password does not match, Try Again",
            });
          }
        });
      }
    } catch (error) {
      return cb(error);
    }
  })
);

passport.use(
  "local-register",
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, cb) => {
      if (!req.body.email) {
        return cb(null, false, { message: "Missing credentials" });
      }
      try {
        const [user, created] = await User.findOrCreate({
          attributes: {
            exclude: ["createdAt, updatedAt"],
          },
          where: { [Op.or]: [{ username }, { email: req.body.email }] },
          defaults: {
            ...req.body,
            password: await bcrypt.hash(password, 10),
          },
        });

        if (created) {
          return cb(null, { ...user.toJSON(), password: null });
        } else {
          if (user.email == req.body.email) {
            return cb(null, false, {
              message: "Email already registered, Please Login",
            });
          } else {
            return cb(null, false, {
              message: "Username already taken",
            });
          }
        }
      } catch (error) {
        return cb(error);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (_, _, profile, cb) => {
      try {
        const foundUser = await User.findOne({
          attributes: {
            exclude: ["createdAt, updatedAt"],
          },
          where: { email: profile.emails[0].value },
        });

        if (foundUser) {
          if (foundUser.password !== "Google") {
            cb(null, false, {
              message: "You have previously registered using USERNAME_PASSWORD",
            });
          } else {
            cb(null, foundUser);
          }
        } else {
          const createdUser = await User.create({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            username: profile.id,
            password: "GOOGLE",
            email: profile.emails[0].value,
          });

          return cb(null, createdUser);
        }
      } catch (error) {
        return cb(error);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  return cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const foundUser = await User.findByPk(id);

    if (foundUser) cb(null, foundUser);
    else cb("User does not exist", null);
  } catch (error) {
    cb(error);
  }
});

export default passport;
