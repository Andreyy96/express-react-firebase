const Joi = require("joi");
const regexConstant = require("../constants/regex.constant")

class UserValidator {
    schemaForRegister =
    Joi.object({
        name: Joi.string().min(3).max(50).trim().required(),
        email: Joi.string().regex(regexConstant.EMAIL).lowercase().trim().required(),
        password: Joi.string().regex(regexConstant.PASSWORD).trim().required(),
    });

    schemaForLogin = Joi.object({
    email: Joi.string()
        .regex(regexConstant.EMAIL)
        .lowercase()
        .trim()
        .required(),
    password: Joi.string().regex(regexConstant.PASSWORD).trim().required(),
    });

}

module.exports = {
    UserValidator: new UserValidator()
}