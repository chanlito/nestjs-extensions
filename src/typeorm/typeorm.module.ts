import { DynamicModule, Global, Module } from '@nestjs/common';

import { CreateTypeOrmProvidersConfiguration } from './typeorm.interfaces';
import { createTypeOrmProviders } from './typeorm.providers';

@Global()
@Module({})
export class TypeOrmModule {
  static forRoot(config: CreateTypeOrmProvidersConfiguration): DynamicModule {
    (config.connectionOptions as any).entities = config.entities;
    const providers = createTypeOrmProviders(config);
    return {
      module: TypeOrmModule,
      components: providers,
      exports: providers
    };
  }
}
