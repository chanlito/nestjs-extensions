import { ISequelizeConfig } from 'sequelize-typescript';

export interface SequelizeModuleConfiguration {
  config: ISequelizeConfig;
  models: any[];
  useCLS?: boolean;
}
