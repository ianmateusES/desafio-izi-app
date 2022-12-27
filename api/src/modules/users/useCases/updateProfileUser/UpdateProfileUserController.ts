import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateProfileUserUseCase } from './UpdateProfileUserUseCase';

class UpdateProfileUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;
    const {
      email,
      password,
      name,
      birthday,
      postal_code,
      street,
      number,
      city,
      state,
    } = req.body;

    const updateProfileUserUseCase = container.resolve(
      UpdateProfileUserUseCase,
    );

    const user = await updateProfileUserUseCase.execute({
      user_id,
      email,
      password,
      name,
      birthday,
      postal_code,
      street,
      number,
      city,
      state,
    });

    return res.status(200).json(instanceToInstance(user));
  }
}

export { UpdateProfileUserController };
