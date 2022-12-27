import { Request, Response, NextFunction } from 'express';
import is from 'type-is';

import { AppError } from '@shared/errors/AppError';

export async function bodyForm(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  if (!is(req, ['multipart'])) return next();

  req.body = JSON.parse(JSON.stringify(req.body));

  if (req.body.address) {
    req.body.address = JSON.parse(req.body.address);
  }

  return next();
}
