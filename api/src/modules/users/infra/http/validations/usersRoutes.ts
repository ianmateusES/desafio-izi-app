import { celebrate, Joi, Segments } from 'celebrate';

const postUserValidation = celebrate({
  [Segments.BODY]: {
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(8).required(),
    password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    name: Joi.string().trim().max(30).required(),
    birthday: Joi.date().required(),
    postal_code: Joi.number().required(),
    street: Joi.string().trim().required(),
    number: Joi.number().required(),
    city: Joi.string().trim().required(),
    state: Joi.string().trim().required(),
  },
});

export { postUserValidation };
