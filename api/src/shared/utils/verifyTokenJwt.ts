import { configAuth } from '@config/auth';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
}

interface IResponse {
  user_id: string;
}

const verifyTokenJwt = (authHeader: string): IResponse => {
  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, configAuth.jwt.secret) as IPayload;

    return { user_id };
  } catch {
    throw new AppError('Invalid token!', 401);
  }
};

export { verifyTokenJwt };