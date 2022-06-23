const Joi = require('joi');

const urlsSchema = Joi.object({
  page: Joi.number().integer().min(1).required(),
  limit: Joi.number().integer().min(1).max(50).required(),
});

module.exports = urlsSchema;
