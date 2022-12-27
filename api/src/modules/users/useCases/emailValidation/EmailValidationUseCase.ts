import { configCache } from '@config/cache';
import { injectable, inject } from 'tsyringe';

import {
  IVerificationCodeDTO,
  IValidationCodeDTO,
} from '@shared/container/providers/CacheProvider/dtos';
import { ICacheProvider } from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  email: string;
  code: string;
}

@injectable()
class EmailValidationUseCase {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  public async execute({ email, code }: IRequest): Promise<void> {
    const keyVerificationCode = `${configCache.keysPrefixes.verificationCode}:${email}`;

    const verificationCode =
      await this.cacheProvider.recover<IVerificationCodeDTO>(
        keyVerificationCode,
      );
    if (!verificationCode) {
      throw new AppError('Email without verification code!', 404);
    }

    if (
      this.dateProvider.checkIsBefore(
        verificationCode.expires_date,
        this.dateProvider.dateNow(),
      )
    ) {
      await this.cacheProvider.invalidate(keyVerificationCode);
      throw new AppError('Expired verification code!');
    }

    if (verificationCode.code !== code) {
      throw new AppError('Invalid code!');
    }

    const keyValidationCode = `${configCache.keysPrefixes.validationCode}:${email}`;

    const expires_date = this.dateProvider.addDays(7);
    const validationCode: IValidationCodeDTO = {
      email,
      expires_date,
    };
    await this.cacheProvider.save(keyValidationCode, validationCode);
    await this.cacheProvider.invalidate(keyVerificationCode);
  }
}

export { EmailValidationUseCase };
