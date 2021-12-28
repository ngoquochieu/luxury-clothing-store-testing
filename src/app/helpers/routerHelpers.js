const Joi = require('@hapi/joi');

const validateParam = (schema, name) => {
    return (req, res, next) => {
        const validateResult = schema.validate({param: req.params[name]})
        
        if(validateResult.error) {
            res.status(400).json(validateResult.error);
        } else {
            if(!req.value) req.value = {};
            if(!req.value.params) req.value.params = {};

            req.value[name] = req.params[name];
            next();
        }
    }
}

const schemas = {
    idSchema: Joi.object().keys({
        param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    })
}

module.exports = {
    validateParam,
    schemas,
}