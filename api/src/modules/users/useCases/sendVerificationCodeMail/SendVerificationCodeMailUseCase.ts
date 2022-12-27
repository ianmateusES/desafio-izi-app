import { configCache } from '@config/cache';
import { resolve } from 'path';
import { injectable, inject } from 'tsyringe';

import { IVerificationCodeDTO } from '@shared/container/providers/CacheProvider/dtos';
import { ICacheProvider } from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '../../repositories';

interface IRequest {
  email: string;
}

@injectable()
class SendVerificationCodeMailUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const userEmailAlreadyExist = await this.userRepository.findByEmail(email);
    if (userEmailAlreadyExist) {
      throw new AppError('Email already used!', 400);
    }

    const keyVerificationCode = `${configCache.keysPrefixes.verificationCode}:${email}`;
    // const keyValidationCode = `${configCache.keysPrefixes.validationCode}:${email}`;
    // await this.cacheProvider.invalidate(keyValidationCode);

    const verificationCodeTemplate = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'verificationCode.hbs',
    );

    const expires_date = this.dateProvider.addDays(1);
    const code = Math.random().toString().slice(2, 8);

    const verificationCode: IVerificationCodeDTO = {
      code,
      expires_date,
    };

    await this.cacheProvider.save(keyVerificationCode, verificationCode);

    await this.mailProvider.sendMail({
      to: {
        name: undefined,
        email,
      },
      subject: 'Verification code',
      templateData: {
        file: verificationCodeTemplate,
        variables: {
          code,
        },
      },
    });
  }
}

export { SendVerificationCodeMailUseCase };
