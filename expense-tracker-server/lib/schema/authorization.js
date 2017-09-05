import Joi from 'joi';

export default Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9_,./#&+-]{5,30}$/).required(),
});
