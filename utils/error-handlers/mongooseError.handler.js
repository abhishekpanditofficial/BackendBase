const AppError = require("../appError");
const httpStatus = require("http-status");

const MongooseErrorHandler = (err, next) => {
    let message = "INTERNAL SERVER ERROR";
    let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

    switch (err.name) {
        case "MongoServerError":
            // Duplicate Fields Error
            if (err.code === 11000) {
                const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
                message = `Duplicate field value: ${value}. Please use another value`;
            }
            break;
        case "CastError":
            // Cast Error
            message = `Invalid ${err.path}: ${err.value}.`;
            break;
        case "ValidationError":
            // Validation Error for all keys
            const errors = Object.values(err.errors).map((el) => el.message);
            message = `Invalid input data. ${errors.join(". ")}`;
            break;
        case "DisconnectedError":
            // Connection time out
            message = `connection timed out in trying to reconnect to MongoDB and will not successfully 
            reconnect to MongoDB unless you explicitly reconnect.`;
            break;
        case "DivergentArrayError":
            // Failed to save an array when loaded with projection
            message = `Failed to save array, try again!`;
            break;
        case "MissingSchemaError":
            // Failed to access model, cause it is not-defined/un-defined
            message = `Schema not defined, resource not available!`;
            break;
        case "DocumentNotFoundError":
            // Failed to save existing document, cause its not found (may be deleted)
            message = `Document not found!`;
            break;
        case "ParallelSaveError":
            // Thrown when you call save() on a document when the same document instance is already saving.
            message = `Failed to save document, as its already saving.`;
            break;
        case "ObjectParameterError":
            // Thrown when you pass a non-object value to a function which expects an object as a paramter
            message = `Failed to pass non-object value, pass an object`;
            break;
        case "OverwriteModelError":
            // Thrown when you call mongoose.model() to re-define a model that was already defined.
            message = `Model already exists, define another model instead`;
            break;
        case "JsonWebTokenError":
            // Json Web Token Error
            message = "Invalid token, login again";
            break;
        case "TokenExpiredError":
            // Token Expired Error
            message = "Token expired , login again";
            break;
        default:
            if (err.message === "Document Not Found") {
                message = "Document Not Found";
            } else {
                message = "INTERNAL SERVER ERROR";
            }
    }
    let error = new AppError(statusCode, message, false, err.stack);
    next(error);
};

module.exports = MongooseErrorHandler;