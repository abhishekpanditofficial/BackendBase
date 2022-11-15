const string = require('@hapi/joi/lib/types/string');
const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'testSchema must have a name']
    },
    email: {
        type: String,
        required: [true, 'testSchema must have a email']
    },
    s3_image: {
        type: String,
        required: false
    }

})

const Test = mongoose.model('Test', testSchema)

module.exports = Test;