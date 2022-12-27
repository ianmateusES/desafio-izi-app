import { Router } from 'express';

import {
  AuthenticateUserController,
  RefreshTokenController,
} from '../../../useCases';
import {
  postSessionsValidation,
  postRefreshTokenValidation,
} from '../validations/authenticateRoutes';

// URL: http://${url}:3333/
const authenticatesRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticatesRoutes.post(
  '/sessions',
  postSessionsValidation,
  authenticateUserController.handle,
);

authenticatesRoutes.post(
  '/refresh-token',
  postRefreshTokenValidation,
  refreshTokenController.handle,
);

export { authenticatesRoutes };
