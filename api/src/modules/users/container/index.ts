import './HashProvider';
import { container } from 'tsyringe';

import { AddressesRepository } from '../infra/typeorm/repositories';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../infra/typeorm/repositories/UserTokensRepository';
import {
  IAddressesRepository,
  IUsersRepository,
  IUserTokensRepository,
} from '../repositories';

container.registerSingleton<IAddressesRepository>(
  'AddressesRepository',
  AddressesRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
