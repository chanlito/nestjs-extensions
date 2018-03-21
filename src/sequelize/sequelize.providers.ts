import { Sequelize } from 'sequelize-typescript';

import { SequelizeModuleConfiguration } from './sequelize.interfaces';

export function createSequelizeProviders({ config, models }: SequelizeModuleConfiguration): any[] {
  const sequelizeProvider = {
    provide: Sequelize,
    useFactory: async () => {
      const sequelize = new Sequelize(config);
      sequelize.addModels(models);
      return sequelize;
    }
  };
  const modelsProvider = (models || []).map(model => {
    return {
      provide: model,
      useFactory: (sequelize: Sequelize) => sequelize.models[model.name],
      inject: [Sequelize]
    };
  });
  return [sequelizeProvider, ...modelsProvider];
}
