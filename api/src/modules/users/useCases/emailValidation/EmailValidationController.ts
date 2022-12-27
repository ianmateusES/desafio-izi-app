import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { EmailValidationUseCase } from './EmailValidationUseCase';

class EmailValidationController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { email, code } = req.body;

    const emailValidationUseCase = container.resolve(EmailValidationUseCase);

    await emailValidationUseCase.execute({
      email,
      code,
    });

    return res.status(201).send();
  }
}

export { EmailValidationController };
