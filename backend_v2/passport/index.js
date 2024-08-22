import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { Strategy as JwtStrategy } from "passport-jwt";
import LocalStrategy from "passport-local";
import User from "../models/user.model.js";

try {
    passport.use(
        "local-login",
        new LocalStrategy(async (username, password, cb) => {
            try {
                const foundUser = await User.findOne({
                    attributes: ["id", "password", "loginType", "refreshToken"],
                    where: { username },
                });

                if (!foundUser || !(await foundUser.checkPassword(password))) {
                    return cb(null, false, {
                        message: "Username and password does not match",
                    });
                }

                if (foundUser.loginType !== "Email") {
                    return cb(null, false, {
                        message: `User registered using ${foundUser.loginType}`,
                    });
                }

                const refreshToken = foundUser.generateRefreshToken();
                const accessToken = foundUser.generateAccessToken();

                foundUser.refreshToken = refreshToken;

                await foundUser.save();

                const loggedInUser = await User.findByPk(foundUser.id, {
                    attributes: ["id", "fullName", "username", "email"],
                });

                if (!loggedInUser) {
                    return cb({
                        message: "Something wend wrong while logging user in",
                    });
                }

                return cb(null, {
                    user: loggedInUser,
                    refreshToken,
                    accessToken,
                });
            } catch (error) {
                return cb(error);
            }
        })
    );

    passport.use(
        "jwt",
        new JwtStrategy(
            {
                jwtFromRequest: (req) => req.cookies?.accessToken,
                secretOrKey: process.env.ACCESS_TOKEN_SECRET,
            },
            async (jwtPayload, cb) => {
                try {
                    const user = await User.findByPk(jwtPayload.id, {
                        attributes: {
                            exclude: [
                                "password",
                                "refreshToken",
                                "createdAt",
                                "updatedAt",
                            ],
                        },
                    });

                    if (!user) {
                        return cb({
                            message: "user does not exist or deleted",
                        });
                    }

                    return cb(null, user);
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
            async (_, __, profile, cb) => {
                try {
                    let user = await User.findOne({
                        where: { email: profile._json.email },
                    });

                    if (!user) {
                        user = await User.create({
                            fullName: profile._json.name,
                            username: profile._json.sub,
                            password: "Google",
                            email: profile._json.email,
                            loginType: "Google",
                        });
                    }

                    if (user.loginType !== "Google") {
                        return cb(null, false, {
                            message: `User registered with ${user.loginType}`,
                        });
                    }

                    const accessToken = user.generateAccessToken();
                    const refreshToken = user.generateRefreshToken();

                    user.refreshToken = refreshToken;

                    await user.save();

                    const loggedInUser = await User.findByPk(user.id, {
                        attributes: ["id", "fullName", "username", "email"],
                    });

                    if (!loggedInUser) {
                        return cb({
                            message:
                                "Something went wrong while logging user in",
                        });
                    }

                    return cb(null, {
                        user: loggedInUser.toJSON(),
                        refreshToken,
                        accessToken,
                    });
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
            const user = await User.findByPk(id);
            if (!user) return cb("User does not exist");
            return cb(null, user);
        } catch (error) {
            return cb(error);
        }
    });
} catch (error) {
    console.error("Passport error :", error);
}

export default passport;
