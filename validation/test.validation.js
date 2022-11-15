const joi = require('@hapi/joi')

const authSchema = joi.object({
   // email : joi.string().email().lowercase().required(),

    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: Joi.ref('password') ,
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .with('username', 'birth_year')
        .xor('password', 'access_token')
        .with('password', 'repeat_password')
})

module.exports = authSchema