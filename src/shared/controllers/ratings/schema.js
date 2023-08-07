const Joi = require('joi');

const schema = Joi.object({
    item_id: Joi.string().required(),
    value: Joi.number().min(0).max(100).required(),
    comment: Joi.string().required()
});

module.exports = schema;
