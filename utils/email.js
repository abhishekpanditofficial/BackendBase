const nodemailer = require('nodemailer')
const config = require('./../config/index')
const { createData } = require('../services/sendEmail.services');
const { EmailErrorHandler } = require("./error-handlers");

//create a transporter
const transporter = nodemailer.createTransport({
    host: config.emailHost,
    port: config.emailPort,
    auth: {
        user: config.emailUser,
        pass: config.emailPassword
    }
})


const sendEmail = async(options, next) => {

    //Define email options
    const mailOptions = {
        from: 'Baebong <baebongweb@gmail.com>',
        to: options.email,
        subject: options.subject,
        html: options.html
    }

    await new Promise(function(resolve, reject) {
        try {

            transporter.sendMail(mailOptions, function(err, info) {
                var status = "";
                var response = "";

                if (err) {
                    status = "FAIL"
                    response = err;

                    createData({
                        status: status,
                        sendedToMail: options.email
                    }, next)

                } else {
                    status = "SUCCESS"
                    response = info.response
                }

                const log = {
                    status: status,
                    sendedToMail: options.email
                }

                createData(log, next)
                resolve(null)
            })
        } catch (err) {
            // console.log(err)
            EmailErrorHandler(err, next);
            resolve(null)
        }
    })
}

module.exports = sendEmail