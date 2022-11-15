const AppError = require("../appError");
const httpStatus = require("http-status");

const GithubErrorHandler = (err, next) => {
    let message = "INTERNAL SERVER ERROR";
    let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

    switch (err.response.data.message) {
        case "Bad credentials":
            message = "Your Github Key Is Incorrect";
            break;
        case "Not Found":
            message = "Your Repository/Workflow not found";
            break;
        default:
            message = "INTERNAL SERVER ERROR";
    }

    let error = new AppError(statusCode, message, false, err.stack);
    next(error);
};

module.exports = GithubErrorHandler;