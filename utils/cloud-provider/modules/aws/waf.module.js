const { getCloudProvider } = require("../../index");
const { handleResponse } = require("./utils");

const AWS = getCloudProvider("AWS");
// AWS- AWS WAF METHODS
const wafv2 = new AWS.WAFV2();

// WEB ACL
const createWebACL = async(params, next, callback) =>
    await wafv2.createWebACL(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });
const getWebACL = async(params, next, callback) =>
    await wafv2.getWebACL(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });
const updateWebACL = async(params, next, callback) =>
    await wafv2.updateWebACL(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });
const deleteWebACL = async(params, next, callback) =>
    await wafv2.deleteWebACL(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });
// IPSET
const createIPSet = async(params, next, callback) =>
    await wafv2.createIPSet(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });
const getIPSet = async(params, next, callback) =>
    await wafv2.getIPSet(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });
const updateIPSet = async(params, next, callback) =>
    await wafv2.updateIPSet(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });
const deleteIPSet = async(params, next, callback) =>
    await wafv2.deleteIPSet(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });
// RULE GROUP
const createRuleGroup = async(params, next, callback) =>
    await wafv2.createRuleGroup(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });
const getRuleGroup = async(params, next, callback) =>
    await wafv2.getRuleGroup(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });
const updateRuleGroup = async(params, next, callback) =>
    await wafv2.updateRuleGroup(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });
const deleteRuleGroup = async(params, next, callback) =>
    await wafv2.deleteRuleGroup(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });
// REGEX PATTERN SET
const createRegexPatternSet = async(params, next, callback) =>
    await wafv2.createRegexPatternSet(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });
const getRegexPatternSet = async(params, next, callback) =>
    await wafv2.getRegexPatternSet(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });
const updateRegexPatternSet = async(params, next, callback) =>
    await wafv2.updateRegexPatternSet(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });
const deleteRegexPatternSet = async(params, next, callback) =>
    await wafv2.deleteRegexPatternSet(params, async function(err, data) {
        return handleResponse(err, data, next, callback);
    });

module.exports = {
    createWebACL,
    getWebACL,
    updateWebACL,
    deleteWebACL,
    createIPSet,
    getIPSet,
    updateIPSet,
    deleteIPSet,
    createRuleGroup,
    getRuleGroup,
    updateRuleGroup,
    deleteRuleGroup,
    createRegexPatternSet,
    getRegexPatternSet,
    updateRegexPatternSet,
    deleteRegexPatternSet,
};