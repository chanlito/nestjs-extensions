import { ConnectionOptions } from 'typeorm';

export interface CreateTypeOrmProvidersConfiguration {
  entities?: Function[];
  customRepositories?: Function[];
  connectionOptions: ConnectionOptions;
}
