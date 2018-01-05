import { DynamicModule, Global, Module } from '@nestjs/common';

import { createRedisProviders, CreateRedisProvidersConfig } from './redis.providers';

@Global()
@Module({})
export class RedisModule {
  static forRoot(options: CreateRedisProvidersConfig): DynamicModule {
    const providers = createRedisProviders(options);
    return {
      module: RedisModule,
      components: providers,
      exports: providers
    };
  }
}
