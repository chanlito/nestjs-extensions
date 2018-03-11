import { Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';

import { Logger } from '../logger';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger?: Logger) {}

  catch(err: any, res: any) {
    const statusCode = typeof err.getStatus === 'function' ? err.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const response = typeof err.getResponse === 'function' ? err.getResponse() : err.message || 'Internal Server Error';

    let responseBody: any;

    if (typeof response === 'string') {
      responseBody = {
        statusCode,
        message: response
      };
    } else if (typeof response.message === 'string') {
      responseBody = {
        statusCode,
        message: response.message
      };
    } else {
      responseBody = {
        statusCode,
        ...response.message
      };
    }

    res.status(statusCode).json(responseBody);

    if (this.logger) {
      const msg = `[AppExceptionFilter] ${responseBody.message}`;
      if (statusCode >= 500) {
        this.logger.error(responseBody, msg);
        err.message = responseBody.message;
        console.error(err.stack);
      } else {
        this.logger.warn(responseBody, msg);
      }
    }
  }
}
