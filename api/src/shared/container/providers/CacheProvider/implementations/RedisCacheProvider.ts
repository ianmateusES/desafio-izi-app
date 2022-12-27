/* eslint-disable @typescript-eslint/no-explicit-any */
import { configCache } from '@config/cache';
import Redis, { Cluster, Redis as RedisClient, RedisOptions } from 'ioredis';

import { ICacheProvider } from '../models/ICacheProvider';

class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient | Cluster;

  constructor() {
    this.client = new Redis(configCache.config.redis as RedisOptions);
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    this.client.del(key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`);

    const pipeline = this.client.pipeline();

    keys.forEach((key: string) => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}

export { RedisCacheProvider };
