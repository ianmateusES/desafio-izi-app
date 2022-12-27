import { Repository } from 'typeorm';

import { dataSourcePostgres } from '@shared/infra/typeorm';

import { ICreateUserDTO } from '../../../dtos';
import { IUsersRepository } from '../../../repositories';
import { User } from '../entities';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = dataSourcePostgres.getRepository(User);
  }

  public async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { id },
      relations: ['address'],
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = this.repository.findOne({
      where: { email },
      relations: ['address'],
    });

    return user;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.repository.create(data);

    await this.repository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const userNew = await this.repository.save(user);

    return userNew;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersRepository };
