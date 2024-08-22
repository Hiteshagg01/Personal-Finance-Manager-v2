import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import passport from "../passport/index.js";

const verifyReq = asyncHandler(async (req, _, next) => {
    passport.authenticate("jwt", (err, user, info) => {

        if (err) {
            return next(new ApiError(500, err.message));
        }

        if (!user) {
            if (info.message === 'No auth token' || info.message ==='invalid token') {
                return next(new ApiError(401, info.message))
            }
            return next(new ApiError(403, info.message));
        }

        req.user = user;

        next();
    })(req, _, next);

    /** 

    ** Method without using passport-jwt
    
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    const tokenPayload = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
    );

    delete tokenPayload["iat"];
    delete tokenPayload["exp"];

    req.user = tokenPayload;

    next(); 
    */
});

export { verifyReq };
