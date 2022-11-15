const AppError = require("../appError");
const httpStatus = require("http-status");

const RedisErrorHandler = (err, next) => {
    let message = "INTERNAL SERVER ERROR";
    let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

    const errorMessages = {};

    message = errorMessages[err.code] || "INTERNAL SERVER ERROR";

    let error = new AppError(statusCode, message, false, err.stack);
    next(error);
};

module.exports = RedisErrorHandler;