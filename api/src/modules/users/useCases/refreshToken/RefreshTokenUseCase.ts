import { configAuth } from '@config/auth';
import { verify, sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider';
import { AppError } from '@shared/errors/AppError';

import { IUserTokensRepository } from '../../repositories';

interface IPayload {
  sub: string;
  username: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

interface IRequest {
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  public async execute({ refresh_token }: IRequest): Promise<ITokenResponse> {
    const {
      secret,
      expiresIn,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = configAuth.jwt;

    let user_id: string;
    try {
      const { sub } = verify(refresh_token, secret_refresh_token) as IPayload;

      user_id = sub;
    } catch (err) {
      throw new AppError('Refresh token non-existent!', 404);
    }

    const userToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        refresh_token,
      );

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!', 400);
    }

    const new_refresh_token = sign({}, secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days,
      this.dateProvider.dateNow(),
    );

    Object.assign(userToken, {
      refresh_token: new_refresh_token,
      expires_date: refresh_token_expires_date,
    });

    await this.userTokensRepository.save(userToken);

    const newToken = sign({}, secret, {
      subject: user_id,
      expiresIn,
    });

    return {
      refresh_token: new_refresh_token,
      token: newToken,
    };
  }
}

export { RefreshTokenUseCase };
