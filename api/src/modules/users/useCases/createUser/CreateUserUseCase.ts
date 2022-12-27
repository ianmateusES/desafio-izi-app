import { configCache } from '@config/cache';
import { injectable, inject } from 'tsyringe';

import { IValidationCodeDTO } from '@shared/container/providers/CacheProvider/dtos';
import { ICacheProvider } from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { AppError } from '@shared/errors/AppError';

import { IHashProvider } from '../../container/HashProvider/models/IHashProvider';
import { User } from '../../infra/typeorm/entities/User';
import { IAddressesRepository, IUsersRepository } from '../../repositories';

interface IRequest {
  email: string;
  password: string;
  name: string;
  birthday: Date;
  avatarName: string;
  postal_code: string;
  street: string;
  number: number;
  city: string;
  state: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  public async execute({
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
  }: IRequest): Promise<User> {
    const keyValidationCode = `${configCache.keysPrefixes.validationCode}:${email}`;

    const validationCode = await this.cacheProvider.recover<IValidationCodeDTO>(
      keyValidationCode,
    );
    if (!validationCode) {
      throw new AppError('Email not validated!', 404);
    }

    if (
      this.dateProvider.checkIsBefore(
        validationCode.expires_date,
        this.dateProvider.dateNow(),
      )
    ) {
      await this.cacheProvider.invalidate(keyValidationCode);
      throw new AppError('Email validation expired!');
    }

    const userEmailAlreadyExist = await this.usersRepository.findByEmail(email);
    if (userEmailAlreadyExist) {
      throw new AppError('Email already used!');
    }

    let avatar: string;
    if (avatarName) {
      avatar = await this.storageProvider.saveFile(avatarName, 'avatar');
    }

    const address = await this.addressesRepository.create({
      postal_code,
      street,
      number,
      city,
      state,
    });

    const user = await this.usersRepository.create({
      email,
      name,
      birthday,
      avatar,
      password: await this.hashProvider.generateHash(password),
      address_id: address.id,
    });

    Object.assign(user, {
      address,
    });

    await this.cacheProvider.invalidate(keyValidationCode);

    return user;
  }
}

export { CreateUserUseCase };
