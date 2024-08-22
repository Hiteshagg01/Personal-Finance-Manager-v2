import  ApiError  from "../utils/ApiError.js";

const errorHandler = (err, _, res, __) => {
    let { statusCode, message } = err;
    // Check if the error is an instance of an ApiError class which extends native Error class

    if (!(err instanceof ApiError)) {
        // if not
        // create a new ApiError instance

        statusCode = statusCode || 500;
        message = message || "Something went wrong";

        err = new ApiError(statusCode, message);
    }

    // now we are sure that the err is instance of ApiError

    res.status(statusCode).json({
        success: false,
        message,
    });
};

export default errorHandler