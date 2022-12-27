import { celebrate, Joi, Segments } from 'celebrate';

const patchProfileValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().max(30),
    email: Joi.string().email(),
    birthday: Joi.date(),

    old_password: Joi.string(),
    password: Joi.when('old_password', {
      is: Joi.exist(),
      then: Joi.string().min(8).required(),
    }),
    password_confirmation: Joi.when('password', {
      is: Joi.exist(),
      then: Joi.valid(Joi.ref('password')).required(),
    }),
  }),
});

export { patchProfileValidation };
