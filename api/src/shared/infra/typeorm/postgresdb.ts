import {
  Address,
  User,
  UserToken,
} from '@modules/users/infra/typeorm/entities';
import { DataSource } from 'typeorm';

import {
  UseExtensionUuid1647009767007,
  CreateAddresses1672105893791,
  CreateUsers1672105908121,
  CreateUserTokens1672105923259,
} from './migrations';

const hosts = {
  homologation: 'localhost',
  production: process.env.POSTGRES_HOST,
};

const dataSourcePostgres = new DataSource({
  type: 'postgres',
  port: 5432,
  host: hosts[process.env.POSTGRES_HOST_TYPE || 'homologation'],
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [Address, User, UserToken],
  migrations: [
    UseExtensionUuid1647009767007,
    CreateAddresses1672105893791,
    CreateUsers1672105908121,
    CreateUserTokens1672105923259,
  ],
});

const createConnectionPostgres = (): Promise<DataSource> => {
  return dataSourcePostgres.initialize();
};

export { createConnectionPostgres };

export default dataSourcePostgres;
