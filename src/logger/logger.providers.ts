import { Logger } from './logger';
import { LoggerToken } from './logger.constants';
import { LoggerConfig } from './logger.interfaces';

export function createLoggerProviders(config?: LoggerConfig) {
  return [
    {
      provide: LoggerToken,
      useFactory: () => new Logger(config)
    }
  ];
}
