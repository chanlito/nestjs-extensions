import { DynamicModule, Global, Module } from '@nestjs/common';

import { createLoggerProviders } from './logger.providers';

@Global()
@Module({})
export class LoggerModule {
  static forRoot(): DynamicModule {
    const providers = createLoggerProviders();
    return {
      module: LoggerModule,
      components: providers,
      exports: providers
    };
  }
}
