import { Logger } from './logger';
import { LoggerToken } from './logger.constants';

export function createLoggerProviders(config: CreateLoggerProvidersConfiguration) {
  return [
    {
      provide: LoggerToken,
      useValue: new Logger(config)
    }
  ];
}

export interface CreateLoggerProvidersConfiguration {
  types: Array<'console' | 'files'>;
  directory: string;
}
