import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendVerificationCodeMailUseCase } from './SendVerificationCodeMailUseCase';

class SendVerificationCodeMailController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendVerificationCodeMailUseCase = container.resolve(
      SendVerificationCodeMailUseCase,
    );

    await sendVerificationCodeMailUseCase.execute({
      email,
    });

    return res.status(202).send();
  }
}

export { SendVerificationCodeMailController };
