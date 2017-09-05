import Joi from 'joi';

export const schema = Joi.object().keys({
  access: Joi.number().max(2),
  email: Joi.string().email().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9_,./#&+-]{5,30}$/).required(),
});

export const sanatize = user => Object.assign(user, {password: undefined});
