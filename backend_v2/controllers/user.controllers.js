import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import User from "../models/user.model.js";
import passport from "../passport/index.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const cookieOptions = {
    httpOnly: true,
    secure: true,
};

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, username, email, password } = req.body;

    if ([fullName, username, email, password].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    const foundUser = await User.findOne({
        where: { [Op.or]: [{ username }, { email }] },
    });

    if (foundUser) {
        if (foundUser.email == email) {
            throw new ApiError(
                409,
                "You are already registered with this email"
            );
        } else if (foundUser.username == username) {
            throw new ApiError(409, "Username already taken");
        } else {
            throw new ApiError(409, "User already exist");
        }
    }

    const newUser = await User.create({
        fullName,
        username,
        password,
        email,
    });

    const refreshToken = newUser.generateRefreshToken();
    const accessToken = newUser.generateAccessToken();

    newUser.refreshToken = refreshToken;

    await newUser.save();

    const registeredUser = await User.findByPk(newUser.id, {
        attributes: ["id", "fullName", "username", "email"],
    });

    if (!registeredUser) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

    return res
        .status(201)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(201, "User register success", {
                user: registeredUser,
                refreshToken,
                accessToken,
            })
        );
});

const loginUser = (req, res, next) => {
    passport.authenticate(
        "local-login",
        {
            session: false,
        },
        (err, user, info) => {
            if (err) {
                return next(new ApiError(500, err.message));
            }

            if (!user) {
                return next(new ApiError(400, info.message));
            }

            return res
                .status(200)
                .cookie("accessToken", user.accessToken, cookieOptions)
                .cookie("refreshToken", user.refreshToken, cookieOptions)
                .json(new ApiResponse(200, "User login success", user));
        }
    )(req, res, next);
};

const logoutUser = asyncHandler(async (req, res) => {
    await User.update(
        {
            refreshToken: null,
        },
        {
            where: {
                id: req.user.id,
            },
        }
    );

    req.user = undefined;

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, "User logout success"));
});

const userProfile = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.user.id, {
        attributes: ["id", "fullName", "username", "email"],
    });

    return res
        .status(200)
        .json(new ApiResponse(200, "User fetch success", user));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const userRefreshToken = req.cookies?.refreshToken;

    if (!userRefreshToken) {
        throw new ApiError(401, "No refresh token");
    }

    const tokenPayload = jwt.verify(
        userRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findByPk(tokenPayload.id);

    if (!user) {
        throw new ApiError(401, "User does not exist");
    }

    if (userRefreshToken !== user.refreshToken) {
        throw new ApiError(401, "Refresh token is expired");
    }

    const newAccessToken = user.generateAccessToken();

    return res
        .status(200)
        .cookie("accessToken", newAccessToken, cookieOptions)
        .json(
            new ApiResponse(200, "Access token refreshed", {
                accessToken: newAccessToken,
            })
        );
});

const handleSocialLogin = asyncHandler(async (req, res, next) => {
    passport.authenticate(
        "google",
        {
            session: false,
        },
        (err, user, info) => {
            if (err) {
                return next(new ApiError(500, err.message));
            }

            if (!user) {
                return next(new ApiError(400, info.message));
            }

            return res
                .status(200)
                .cookie("accessToken", user.accessToken, cookieOptions)
                .cookie("refreshToken", user.refreshToken, cookieOptions)
                .redirect("http://localhost:5173/dashboard");
            // .json(new ApiResponse(200, "User login success", user))
        }
    )(req, res, next);
});

export {
    handleSocialLogin,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    userProfile,
};

/*

** Login without passport vanilla login

const loginUserPlain = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if ([username, password].some((field) => !field.trim())) {
        throw new ApiError(400, "Missing credentials");
    }

    const foundUser = await User.findOne({
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
        where: { username },
    });

    if (!foundUser) {
        throw new ApiError(401, "Username and password does not match");
    }

    if (!(await foundUser.checkPassword(password))) {
        throw new ApiError(401, "Username and password does not match");
    }

    const refreshToken = foundUser.generateRefreshToken();
    const accessToken = foundUser.generateAccessToken();

    foundUser.refreshToken = refreshToken;

    await foundUser.save();

    const loggedInUser = await User.findByPk(foundUser.id, {
        attributes: {
            exclude: ["password", "createdAt", "updatedAt", "refreshToken"],
        },
    });

    if (!loggedInUser) {
        throw new ApiError(500, "Something went wrong while logging user");
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(200, "User login success", {
                user: loggedInUser,
                refreshToken,
                accessToken,
            })
        );
});

*/
