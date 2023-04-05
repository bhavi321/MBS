const Joi = require("joi")



const userJoi = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(8).required(),
    type: Joi.string().required().valid("ADMIN","VENDOR")

})

module.exports = {userJoi}