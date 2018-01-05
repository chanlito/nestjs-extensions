import { Inject } from '@nestjs/common';
import { Connection, EntityManager } from 'typeorm';

import { getCustomRepositoryToken, getRepositoryToken } from './typeorm.utils';

export const OrmRepository = (entity: Function) => Inject(getRepositoryToken(entity));

export const OrmCustomRepository = (entity: Function) => Inject(getCustomRepositoryToken(entity));

export const OrmEntityManager = () => Inject(EntityManager);

export const OrmConnection = () => Inject(Connection);
