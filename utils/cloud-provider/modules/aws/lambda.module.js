const { getCloudProvider } = require("../../index");
const { handleResponse } = require("./utils");

const AWS = getCloudProvider("AWS");
// AWS- AWS LAMBDA METHODS
const lambda = new AWS.Lambda();

// Lambda methods
const deleteFunction = async(params, next, callback) =>
    await lambda.deleteFunction(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });
const getFunction = async(params, next, callback) =>
    await lambda.getFunction(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });
const updateFunctionConfiguration = async(params, next, callback) =>
    await lambda.updateFunctionConfiguration(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });

module.exports = { deleteFunction, getFunction, updateFunctionConfiguration };