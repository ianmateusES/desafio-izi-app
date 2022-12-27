import { configUpload } from '@config/upload';
import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from '../../../useCases';
import { bodyForm } from '../middlewares/bodyForm';
import { postUserValidation } from '../validations/usersRoutes';

// URL: http://${url}:3333/users
const usersRoutes = Router();

const uploadAvatar = multer(configUpload.multer);

const createUserController = new CreateUserController();

usersRoutes.post(
  '/',
  uploadAvatar.single('avatar'),
  bodyForm,
  postUserValidation,
  createUserController.handle,
);

export { usersRoutes };
