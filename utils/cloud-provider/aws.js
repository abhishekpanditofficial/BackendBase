const AWS = require("aws-sdk");

const { aws } = require("./../../config");

AWS.config.update({
    accessKeyId: aws.accessKeyId,
    secretAccessKey: aws.secretAccessKey,
    region: aws.region,
});

module.exports = { AWS };
