import { Logger } from './logger';
import { LoggerConfig } from './logger.interfaces';

export function createLoggerProviders(config?: LoggerConfig) {
  return [
    {
      provide: Logger,
      useFactory: () => new Logger(config)
    }
  ];
}
