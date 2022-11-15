const { getCloudProvider } = require("../../index");
const { handleResponse } = require("./utils");

const AWS = getCloudProvider("AWS");

// Cloudfront Methods
const createInvalidation = async(params, next, callback) => {
    // AWS- AWS Cloudfront METHODS
    const cloudfront = new AWS.CloudFront();
    await cloudfront.createInvalidation(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });
}

module.exports = { createInvalidation };