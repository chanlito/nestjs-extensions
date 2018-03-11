import * as mongoose from 'mongoose';

import { MongooseConnectionToken } from './mongoose.constants';
import { MongooseModuleConfig } from './mongoose.interfaces';

export function createMongooseModuleProviders(config: MongooseModuleConfig) {
  const mongooseProvider = {
    provide: MongooseConnectionToken,
    useFactory: async () => mongoose.connect(config.uris, config.options)
  };
  const modelsProvider = (config.models || []).map(model => {
    return {
      provide: model.token,
      useFactory: connection => connection.model(model.name, model.schema),
      inject: [MongooseConnectionToken]
    };
  });
  return [mongooseProvider, ...modelsProvider];
}
