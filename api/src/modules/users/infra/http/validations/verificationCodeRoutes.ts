import { celebrate, Joi, Segments } from 'celebrate';

const postSendVerificationCodeMailValidation = celebrate({
  [Segments.BODY]: {
    email: Joi.string().trim().email().required(),
  },
});

const postEmailValidationValidation = celebrate({
  [Segments.BODY]: {
    email: Joi.string().trim().email().required(),
    code: Joi.string().length(6).required(),
  },
});

export {
  postSendVerificationCodeMailValidation,
  postEmailValidationValidation,
};
