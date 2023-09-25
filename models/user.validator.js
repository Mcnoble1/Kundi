const Joi = require('joi')

const userValidator = Joi.object({

    name: Joi.string().min(3).max(30).required().messages({
        'string.base': 'Fullname must be a string',
        'string.empty': 'Fullname is required',
        'string.min': 'Fullname must be at least 3 characters long',
        'string.max': 'Fullname must be less than or equal to 30 characters long',
    }),

    phone: Joi.string().regex(/^\+?[1-9]\d{1,14}$/).required().messages({
        'string.base': 'Phone number must be a string',
        'string.empty': 'Phone number is required',
        'string.pattern.base': 'Phone number must be a valid phone number',
    }),

    area: Joi.string().required().messages({
        'string.base': 'Area must be a string',
        'string.empty': 'Area is required',
    }),

    block: Joi.string().required().messages({
        'string.base': 'Block must be a string',
        'string.empty': 'Block is required',
    }),

    languages: Joi.string().required().messages({    
        'string.base': 'Languages must be an array',
        'array.empty': 'Languages is required',
    }),
})
    


const validateUser = async (req, res, next) => {
    const UserPayload = req.body;
    try {
        await userValidator.validateAsync(UserPayload);
        next();
    } catch (error) {
        console.log(error);
        return res.status(406).send(error.details[0].message);
    }

}

module.exports = validateUser