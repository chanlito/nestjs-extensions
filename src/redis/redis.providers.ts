import { Logger } from '@nestjs/common';
import * as redis from 'redis';

import { RedisClientToken } from './redis.constants';

const logger = new Logger('RedisModule');

export function createRedisProviders(config: CreateRedisProvidersConfig) {
  const redisProvider = {
    provide: RedisClientToken,
    useFactory: () => {
      const redisClient = redis.createClient({
        host: config.host,
        port: config.port,
        auth_pass: config.auth_pass
      });
      redisClient.on('connect', () => logger.log('Connecting'));
      redisClient.on('ready', () => logger.log('Connected'));
      redisClient.on('reconnecting', () => logger.log('Reconnecting'));
      redisClient.on('end', () => logger.warn('Ended'));
      redisClient.on('error', e => logger.error(e.message, e.stack));
      return redisClient;
    }
  };
  return [redisProvider];
}

export interface CreateRedisProvidersConfig {
  host: string;
  port: number;
  auth_pass?: string;
}
