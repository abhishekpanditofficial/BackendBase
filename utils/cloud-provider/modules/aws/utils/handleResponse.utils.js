const { AwsErrorHandler } = require("../../../../error-handlers");

const handleResponse = async function (err, data, next, callback) {
    if (err) {
        AwsErrorHandler(err, next);
    } else {
        callback(data);
    }
};

module.exports = handleResponse;
