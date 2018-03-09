import { Sequelize } from 'sequelize-typescript';

import { SequelizeModuleConfiguration } from './sequelize.interfaces';
import { getModelToken } from './sequelize.utils';

export function createSequelizeProviders({ config, models }: SequelizeModuleConfiguration): any[] {
  const sequelizeProvider = {
    provide: Sequelize,
    useFactory: async () => {
      const sequelize = new Sequelize(config);
      sequelize.addModels(models);
      return sequelize;
    }
  };
  const modelsProvider = (models || []).map(m => {
    return {
      provide: getModelToken(m),
      useFactory: (sequelize: Sequelize) => sequelize.models[m.name],
      inject: [Sequelize]
    };
  });
  return [sequelizeProvider, ...modelsProvider];
}
