import { Inject } from '@nestjs/common';

import { LoggerToken } from './logger.constants';

export const InjectLogger = () => Inject(LoggerToken);
