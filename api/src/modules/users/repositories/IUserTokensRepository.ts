import { ICreateUserTokenDTO } from '../dtos';
import { UserToken } from '../infra/typeorm/entities';

interface IUserTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken>;
  save(userToken: UserToken): Promise<UserToken>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken>;
  findByUserId(user_id: string): Promise<UserToken>;
  findByRefreshToken(refresh_token: string): Promise<UserToken>;
  deleteById(id: string): Promise<void>;
}

export { IUserTokensRepository };
