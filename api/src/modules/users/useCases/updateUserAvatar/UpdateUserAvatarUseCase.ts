import { injectable, inject } from 'tsyringe';

import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { AppError } from '@shared/errors/AppError';

import { User } from '../../infra/typeorm/entities';
import { IUsersRepository } from '../../repositories';

interface IRequest {
  user_id: string;
  avatarName: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found!', 404);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar, 'avatar');
    }

    const fileName = await this.storageProvider.saveFile(avatarName, 'avatar');

    user.avatar = fileName;

    await this.usersRepository.save(user);

    return user;
  }
}

export { UpdateUserAvatarUseCase };
