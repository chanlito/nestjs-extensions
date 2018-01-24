import * as cls from 'continuation-local-storage';
import { Sequelize } from 'sequelize-typescript';

import { SequelizeModuleConfiguration } from './sequelize.interfaces';
import { getModelToken } from './sequelize.utils';

export function createSequelizeProviders({ config, models, useCLS }: SequelizeModuleConfiguration): any[] {
  const sequelizeProvider = {
    provide: Sequelize,
    useFactory: async () => {
      const namespace = cls.createNamespace(process.env.CLS_NAMESPACE || 'sequelize-typescript-namespace');
      (Sequelize as any).__proto__.useCLS(namespace);
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
