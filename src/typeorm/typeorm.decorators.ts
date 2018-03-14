import { Inject } from '@nestjs/common';
import { Connection, EntityManager } from 'typeorm';

import { getCustomRepositoryToken, getRepositoryToken } from './typeorm.utils';

export const InjectRepository = (entity: Function) => Inject(getRepositoryToken(entity));

export const InjectCustomRepository = (entity: Function) => Inject(getCustomRepositoryToken(entity));

export const InjectEntityManager = () => Inject(EntityManager);

export const InjectConnection = () => Inject(Connection);
