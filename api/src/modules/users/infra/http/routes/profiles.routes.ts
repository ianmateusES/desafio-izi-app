import { configUpload } from '@config/upload';
import {
  ShowProfileController,
  UpdateProfileUserController,
  UpdateUserAvatarController,
} from '@modules/users/useCases';
import { Router } from 'express';
import multer from 'multer';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { patchProfileValidation } from '../validations/profileRoutes';

// URL: http://${url}:3333/profile
const profileUserRouter = Router();

const uploadAvatar = multer(configUpload.multer);

const showProfileController = new ShowProfileController();
const updateProfileUserController = new UpdateProfileUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

profileUserRouter.use(ensureAuthenticated);

profileUserRouter.get('/me', showProfileController.handle);

// profileUserRouter.delete('/me', deleteUserController.handle);

profileUserRouter.patch(
  '/me',
  patchProfileValidation,
  updateProfileUserController.handle,
);

profileUserRouter.patch(
  '/avatar',
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
);

export { profileUserRouter };
