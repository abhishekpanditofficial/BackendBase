const { getCloudProvider } = require("../../index");
const { handleResponse } = require("./utils");

const AWS = getCloudProvider("AWS");
// AWS- AWS S3 METHODS
const s3 = new AWS.S3();

// S3 Methods
const upload = async(params, next, callback) =>
    await s3.upload(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });

module.exports = { upload };