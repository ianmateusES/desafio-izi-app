import { omitBy, isNil } from 'lodash';
import { injectable, inject, container } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IHashProvider } from '../../container/HashProvider/models/IHashProvider';
import { User } from '../../infra/typeorm/entities/User';
import { IAddressesRepository, IUsersRepository } from '../../repositories';

interface IRequest {
  user_id: string;
  name?: string;
  email?: string;

  birthday?: Date;

  old_password?: string;
  password?: string;

  postal_code?: string;
  street?: string;
  number?: number;
  city?: string;
  state?: string;
}

@injectable()
class UpdateProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    birthday,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found!', 404);
    }

    if (email && user.email !== email) {
      const userAlreadyExist = await this.usersRepository.findByEmail(email);
      if (userAlreadyExist) {
        throw new AppError('Email already used!', 400);
      }
      user.email = email;
    }

    Object.assign(
      user,
      omitBy(
        {
          name,
          birthday,
        },
        isNil,
      ),
    );

    if (password && !old_password) {
      throw new AppError(
        'You meed to inform the old password to set a new password!',
        400,
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match!', 400);
      }

      Object.assign(user, {
        password: await this.hashProvider.generateHash(password),
      });
    }

    // Atualizar endereço

    return this.usersRepository.save(user);
  }
}

export { UpdateProfileUserUseCase };
