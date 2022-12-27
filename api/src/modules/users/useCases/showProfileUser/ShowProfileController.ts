import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowProfileUseCase } from './ShowProfileUseCase';

class ShowProfileController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;

    const showProfileUseCase = container.resolve(ShowProfileUseCase);

    const profile = await showProfileUseCase.execute({ user_id });

    return res.status(200).json(instanceToInstance(profile));
  }
}

export { ShowProfileController };
