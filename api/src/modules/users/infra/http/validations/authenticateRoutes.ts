import { celebrate, Joi, Segments } from 'celebrate';

const postSessionsValidation = celebrate({
  [Segments.BODY]: {
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(8).required(),
  },
});

const postRefreshTokenValidation = celebrate({
  [Segments.BODY]: {
    refresh_token: Joi.string().required(),
  },
});

export { postSessionsValidation, postRefreshTokenValidation };
