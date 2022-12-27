import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;
    const { filename } = req.file;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    const user = await updateUserAvatarUseCase.execute({
      user_id,
      avatarName: filename,
    });

    return res.status(200).json(instanceToInstance(user));
  }
}

export { UpdateUserAvatarController };
