const mongoose = require('mongoose')

const sendEmailSchema = new mongoose.Schema({
    sendedToMail : {
        type: String,
        required : true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    type : {
        type:String,
        default : "Newsletter"
    },
    status:{
        type: String,
        enum:['SUCCESS', 'FAIL'],
        required: true
    }
})

const sendEmail = mongoose.model('sendEmail', sendEmailSchema)

module.exports = sendEmail
