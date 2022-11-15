const fs = require('fs');
const httpStatus = require('http-status')
const AppError = require('../appError')

var readHTML = function(path) {
    try {
        return fs.readFileSync(path, { encoding: "utf-8" });
    } catch (error) {
        console.log(error)
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Email template not found");
    }
}

const emailHTML = function() {
    return readHTML(`${__dirname}/email-templates.html`)
}


module.exports = { emailHTML }