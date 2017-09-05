import Joi from 'joi';

export const schema = Joi.object().keys({
  amount: Joi.number().required(),
  comment: Joi.string().required(),
  datetime: Joi.number().required(),
  description: Joi.string().required(),
  createdBy: Joi.string(),
});

export const validate = map => Joi.validate(map, schema);
