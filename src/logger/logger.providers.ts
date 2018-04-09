import { Logger, LoggerConfig } from './logger';

export function createLoggerProviders(config?: LoggerConfig) {
  return [
    {
      provide: Logger,
      useFactory: () => new Logger(config)
    }
  ];
}
