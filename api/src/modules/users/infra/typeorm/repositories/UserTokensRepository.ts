import { ICreateUserTokenDTO } from '@modules/users/dtos';
import { IUserTokensRepository } from '@modules/users/repositories';
import { Repository } from 'typeorm';

import { dataSourcePostgres } from '@shared/infra/typeorm';

import { UserToken } from '../entities';

class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = dataSourcePostgres.getRepository(UserToken);
  }

  public async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken> {
    const userToken = await this.repository.findOneBy({
      user_id,
      refresh_token,
    });

    return userToken;
  }

  public async findByUserId(user_id: string): Promise<UserToken> {
    const userToken = await this.repository.findOneBy({
      user_id,
    });

    return userToken;
  }

  public async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const userToken = await this.repository.findOneBy({ refresh_token });

    return userToken;
  }

  public async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  public async save(user: UserToken): Promise<UserToken> {
    const userNew = await this.repository.save(user);

    return userNew;
  }

  public async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UserTokensRepository };
