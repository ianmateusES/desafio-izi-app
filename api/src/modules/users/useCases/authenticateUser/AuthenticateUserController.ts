import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const { user, token, refresh_token } =
      await authenticateUserUseCase.execute({
        email,
        password,
      });

    return res.status(200).json({
      user: instanceToInstance(user),
      token,
      refresh_token,
    });
  }
}

export { AuthenticateUserController };
