import { Inject } from '@nestjs/common';

import { RedisClientToken } from './redis.constants';

export const InjectRedisClient = () => Inject(RedisClientToken);
