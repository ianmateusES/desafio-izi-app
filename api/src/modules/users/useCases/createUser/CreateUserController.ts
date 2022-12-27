import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
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

    let avatarName: string;
    if (req.file) {
      const { filename } = req.file;
      avatarName = filename;
    }

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      email,
      password,
      name,
      birthday,
      avatarName,
      postal_code,
      street,
      number,
      city,
      state,
    });

    return res.status(201).json(instanceToInstance(user));
  }
}

export { CreateUserController };
