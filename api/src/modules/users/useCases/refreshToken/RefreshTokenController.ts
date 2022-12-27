import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshTokenUseCase } from './RefreshTokenUseCase';

class RefreshTokenController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { refresh_token } = req.body;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const new_refresh_token = await refreshTokenUseCase.execute({
      refresh_token,
    });

    return res.status(200).json(new_refresh_token);
  }
}

export { RefreshTokenController };
