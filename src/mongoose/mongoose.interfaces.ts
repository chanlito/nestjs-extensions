import { ConnectionOptions, Schema } from 'mongoose';

export interface MongooseModuleConfig {
  uris: string;
  options?: ConnectionOptions;
  models?: Array<{ name: string; schema: Schema; token: string }>;
}
