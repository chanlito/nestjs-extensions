import { DynamicModule, Global, Module } from '@nestjs/common';

import { SequelizeModuleConfiguration } from './sequelize.interfaces';
import { createSequelizeProviders } from './sequelize.providers';

@Global()
@Module({})
export class SequelizeModule {
  static forRoot(config: SequelizeModuleConfiguration): DynamicModule {
    const providers = createSequelizeProviders(config);
    return {
      module: SequelizeModule,
      components: providers,
      exports: providers
    };
  }
}
