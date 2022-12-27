import { ICreateUserDTO } from '../dtos';
import { User } from '../infra/typeorm/entities';

interface IUsersRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}

export { IUsersRepository };
