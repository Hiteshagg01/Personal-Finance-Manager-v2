import { Router } from "express";
import {
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    userProfile,
    handleSocialLogin
} from "../controllers/user.controllers.js";
import { verifyReq } from "../middlewares/auth.middleware.js";
import passport from "../passport/index.js";

const router = Router();

router
    .route("/register")
    .post(registerUser);

router
    .route("/login")
    .post(loginUser);

router
    .route("/logout")
    .delete(verifyReq, logoutUser);

router
    .route("/profile")
    .get(verifyReq, userProfile);

router
    .route("/refresh-access")
    .get(refreshAccessToken);

router
    .route("/google")
    .get(
        passport.authenticate("google", {
            scope: ["profile", "email"],
        })
    )
;

router
    .route("/google/callback")
    .get(handleSocialLogin)
;

export default router;
