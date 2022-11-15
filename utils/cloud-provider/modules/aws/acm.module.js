const { getCloudProvider } = require("../../index");
const { handleResponse } = require("./utils");

const AWS = getCloudProvider("AWS");
// AWS- AWS ACM METHODS
const acm = new AWS.ACM();

// Certificate methods
const requestCertificate = async(params, next, callback) =>
    await acm.requestCertificate(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });
const describeCertificate = async(params, next, callback) =>
    await acm.describeCertificate(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });
const deleteCertificate = async(params, next, callback) =>
    await acm.deleteCertificate(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });
const importCertificate = async(params, next, callback) =>
    await acm.importCertificate(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });
const updateCertificateOptions = async(params, next, callback) =>
    await acm.updateCertificateOptions(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });

module.exports = { requestCertificate, describeCertificate, deleteCertificate, importCertificate, updateCertificateOptions };