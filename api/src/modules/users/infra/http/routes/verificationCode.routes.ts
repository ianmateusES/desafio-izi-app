import { Router } from 'express';

import {
  SendVerificationCodeMailController,
  EmailValidationController,
} from '../../../useCases';
import {
  postSendVerificationCodeMailValidation,
  postEmailValidationValidation,
} from '../validations/verificationCodeRoutes';

// URL: http://${url}:3333/verification-code
const verificationCodeRoutes = Router();

const sendVerificationCodeMailController =
  new SendVerificationCodeMailController();
const emailValidationController = new EmailValidationController();

verificationCodeRoutes.post(
  '/',
  postSendVerificationCodeMailValidation,
  sendVerificationCodeMailController.handle,
);

verificationCodeRoutes.post(
  '/validation',
  postEmailValidationValidation,
  emailValidationController.handle,
);

export { verificationCodeRoutes };
