import {
  verificationCodeRoutes,
  usersRoutes,
  authenticatesRoutes,
  profileUserRouter,
} from '@modules/users/infra/http/routes';
import { Router } from 'express';

const routes = Router();

routes.get('/', (_, res) => {
  return res.json({ message: 'Application running' });
});

routes.use('/verification-code', verificationCodeRoutes);
routes.use('/users', usersRoutes);
routes.use('/profile', profileUserRouter);

routes.use(authenticatesRoutes);

export { routes };
