class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    // Duplicate key error (MongoDB)
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    // Invalid JWT error
    if (err.name === "JsonWebTokenError") {
        const message = "Json Web Token is invalid, Try Again!";
        err = new ErrorHandler(message, 400);
    }

    // Expired JWT error
    if (err.name === "TokenExpiredError") {
        const message = "Json Web Token is expired, Try Again!";
        err = new ErrorHandler(message, 400);
    }

    // Invalid ObjectId (MongoDB)
    if (err.name === "CastError") {
        const message = `Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Handle missing JSON body (SyntaxError)
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        err = new ErrorHandler("Bad Request - Invalid JSON", 400);
    }

    // Unauthorized error (JWT/Authentication)
    if (err.name === "UnauthorizedError") {
        const message = "You are not authorized to access this resource.";
        err = new ErrorHandler(message, 401);
    }

    // Forbidden error (Authorization)
    if (err.name === "ForbiddenError") {
        const message = "You do not have permission to access this resource.";
        err = new ErrorHandler(message, 403);
    }

    // Database connection issues
    if (err.name === "MongoNetworkError") {
        const message = "Database connection failed.";
        err = new ErrorHandler(message, 500);
    }

    // Catch all other errors
    if (!err.statusCode) {
        err = new ErrorHandler("An unknown error occurred.", 500);
    }

    // MongoDB Validation Errors
    const errorMessage = err.errors
        ? Object.values(err.errors).map((error) => error.message).join(" ")
        : err.message;

    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage,
    });
};

export default ErrorHandler;
