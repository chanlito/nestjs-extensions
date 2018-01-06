import 'winston-daily-rotate-file';

import * as winston from 'winston';

import { CreateLoggerProvidersConfiguration } from './logger.interface';

export class Logger {
  private readonly logger: winston.LoggerInstance;

  constructor(private config: CreateLoggerProvidersConfiguration) {
    // configure daily log rotation options
    const dailyRotateCommonOpts = { datePattern: 'yyyy-MM-dd.', prepend: true };

    this.logger = new winston.Logger({
      level: 'debug'
    });

    if (config.types.some(x => x === 'console')) {
      this.logger.add(winston.transports.Console, {
        colorize: true,
        prettyPrint: true,
        timestamp: true
      });
    }

    if (config.types.some(x => x === 'files')) {
      this.logger.add(winston.transports.DailyRotateFile, {
        filename: this.config.directory + '/info.log',
        level: 'info',
        name: 'info',
        ...dailyRotateCommonOpts
      });
      this.logger.add(winston.transports.DailyRotateFile, {
        filename: this.config.directory + '/debug.log',
        level: 'debug',
        name: 'debug',
        tailable: true,
        ...dailyRotateCommonOpts
      });
      this.logger.add(winston.transports.DailyRotateFile, {
        filename: this.config.directory + '/error.log',
        level: 'error',
        name: 'error',
        tailable: true,
        ...dailyRotateCommonOpts
      });
    }
  }

  info(msg: string, ...meta: any[]) {
    this.logger.info(msg, ...meta);
  }

  debug(msg: string, ...meta: any[]) {
    this.logger.debug(msg, ...meta);
  }

  error(msg: string, ...meta: any[]) {
    this.logger.error(msg, ...meta);
  }
}
