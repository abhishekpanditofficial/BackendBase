const mongoose = require("mongoose");
const httpStatus = require("http-status");

// const { logger } = require("../config");
const { AppError } = require("../utils");
const { environment } = require("../config");

const errorConverter = (err, req, res, next) => {
    console.log(err);
    let error = err;
    if (!(error instanceof AppError)) {
        const statusCode = error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new AppError(statusCode, message, false, err.stack);
    }
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    if (environment === "production" && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        ...(environment === "development" && { stack: err.stack }),
    };

    if (environment === "development") {
        console.log(err);
    }
    res.status(statusCode).send(response);
};

module.exports = {
    errorConverter,
    errorHandler,
};