import { Logger } from '@nestjs/common';
import { Connection, createConnection, EntityManager } from 'typeorm';

import { CreateTypeOrmProvidersConfiguration } from './typeorm.interfaces';
import { getRepositoryToken } from './typeorm.utils';

const logger = new Logger('TypeOrmModule');

export function createTypeOrmProviders(config: CreateTypeOrmProvidersConfiguration) {
  const connectionProvider = {
    provide: Connection,
    useFactory: async () => {
      const connection = await createConnection(config.connectionOptions).catch(e => {
        throw e;
      });
      logger.log('Database connected');
      return connection;
    }
  };
  const entityManagerProvider = {
    provide: EntityManager,
    useFactory: (connection: Connection) => connection.manager,
    inject: [Connection]
  };

  const getRepository: any = (connection: Connection, entity) =>
    connection.options.type === 'mongodb' ? connection.getMongoRepository(entity) : connection.getRepository(entity);
  const repositories = (config.entities || []).map(entity => ({
    provide: getRepositoryToken(entity),
    useFactory: (connection: Connection) => getRepository(connection, entity),
    inject: [Connection]
  }));

  const getCustomReposity: any = (connection: Connection, repository) => connection.getCustomRepository(repository);
  const customRepositories = (config.customRepositories || []).map(repository => ({
    provide: `${repository.name.split('Repository')[0]}CustomRepository`,
    useFactory: (connection: Connection) => getCustomReposity(connection, repository),
    inject: [Connection]
  }));

  return [connectionProvider, entityManagerProvider, ...repositories, ...customRepositories];
}
