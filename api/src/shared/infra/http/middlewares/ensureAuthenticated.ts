import { Request, Response, NextFunction } from 'express';

import { verifyTokenJwt } from '@shared/utils/verifyTokenJwt';

import { AppError } from '../../../errors/AppError';

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token is missing!', 401);
  }

  const { user_id } = verifyTokenJwt(authHeader);

  req.user = {
    id: user_id,
  };

  return next();
}
