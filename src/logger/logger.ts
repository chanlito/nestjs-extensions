import * as optional from 'optional';

const pino = optional('pino');

export class Logger {
  private readonly logger: any;

  constructor() {
    this.logger = pino({
      prettyPrint: process.env.NODE_ENV !== 'production'
    });
  }

  log(msg: string): void;
  log(obj: object, msg?: string): void;
  log(msgOrObj: any, msg: string = ''): void {
    if (arguments.length > 2) {
      const { '0': message, '1': context } = arguments;
      this.logger.info(`[${context}] ${message}`);
    } else {
      this.logger.info(msgOrObj, msg);
    }
  }

  error(msg: string): void;
  error(obj: object, msg?: string): void;
  error(msgOrObj: any, msg: string = ''): void {
    if (arguments.length > 2) {
      const { '0': message, '1': context } = arguments;
      this.logger.error(`[${context}] ${message}`);
    } else {
      this.logger.error(msgOrObj, msg);
    }
  }

  warn(msg: string): void;
  warn(obj: object, msg?: string): void;
  warn(msgOrObj: any, msg: string = ''): void {
    if (arguments.length > 2) {
      const { '0': message, '1': context } = arguments;
      this.logger.warn(`[${context}] ${message}`);
    } else {
      this.logger.warn(msgOrObj, msg);
    }
  }
}
