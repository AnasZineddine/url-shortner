const Joi = require('joi');

const urlSchema = Joi.object({
  url: Joi.string().uri().max(2048).required(),
});

module.exports = urlSchema;
