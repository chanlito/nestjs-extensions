import { Logger } from './logger';
import { LoggerToken } from './logger.constants';
import { CreateLoggerProvidersConfiguration } from './logger.interface';

export function createLoggerProviders(config: CreateLoggerProvidersConfiguration) {
  return [
    {
      provide: LoggerToken,
      useValue: new Logger(config)
    }
  ];
}
