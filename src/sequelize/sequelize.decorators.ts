import { Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

import { getModelToken } from './sequelize.utils';

export const InjectModel = (model: Function) => Inject(getModelToken(model));

export const InjectSequelize = () => Inject(Sequelize);
