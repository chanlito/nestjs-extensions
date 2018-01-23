import { ISequelizeConfig, Model } from 'sequelize-typescript';

import { Omit } from '..';

export interface SequelizeModuleConfiguration {
  config: ISequelizeConfig;
  models: any[];
  useCLS?: boolean;
}

export type SequelizeProps =
  | '$add'
  | '$count'
  | '$create'
  | '$get'
  | '$has'
  | '$remove'
  | '$set'
  | 'changed'
  | 'destroy'
  | 'decrement'
  | 'equals'
  | 'get'
  | 'equalsOneOf'
  | 'getDataValue'
  | 'createdAt'
  | 'deletedAt'
  | 'increment'
  | 'isNewRecord'
  | 'Model'
  | 'previous'
  | 'reload'
  | 'restore'
  | 'save'
  | 'sequelize'
  | 'set'
  | 'setAttributes'
  | 'setDataValue'
  | 'toJSON'
  | 'update'
  | 'updateAttributes'
  | 'updatedAt'
  | 'where'
  | 'validate'
  | 'version';

export type Props<T extends Model<T>> = Partial<Omit<T, SequelizeProps>>;
