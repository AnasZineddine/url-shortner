const Joi = require('joi');

const hashSchema = Joi.object({
  hash: Joi.string().alphanum().max(7).required(),
});

module.exports = hashSchema;
