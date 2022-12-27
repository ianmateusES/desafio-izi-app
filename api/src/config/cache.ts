import { RedisOptions } from 'ioredis';
import { RedisClientOptions } from 'redis';

interface ICacheConfig {
  driver: 'redis';
  config: {
    redis: RedisOptions | RedisClientOptions;
  };
  keysPrefixes: {
    verificationCode: string;
    validationCode: string;
  };
}

const configCache = {
  driver: 'redis',

  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS || undefined,
    },
  },

  keysPrefixes: {
    verificationCode: 'verification-code',
    validationCode: 'validation-email',
  },
} as ICacheConfig;

export { configCache };
