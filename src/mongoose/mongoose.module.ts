import { DynamicModule, Global, Module } from '@nestjs/common';

import { MongooseModuleConfig } from './mongoose.interfaces';
import { createMongooseModuleProviders } from './mongoose.providers';

@Global()
@Module({})
export class MongooseModule {
  static forRoot(config: MongooseModuleConfig): DynamicModule {
    const providers = createMongooseModuleProviders(config);
    return {
      module: MongooseModule,
      components: providers,
      exports: providers
    };
  }
}
