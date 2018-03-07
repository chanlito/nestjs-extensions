import { Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import * as PrettyError from 'pretty-error';

const pe = new PrettyError();

@Catch()
export class ApplicationExceptionFilter implements ExceptionFilter {
  catch(err: any, res: any) {
    const statusCode = typeof err.getStatus === 'function' ? err.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const response = typeof err.getResponse === 'function' ? err.getResponse() : 'Internal Server Error';

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

    if (process.env.NODE_ENV !== 'production') {
      responseBody = { ...responseBody, stack: err.stack };
    }

    res.status(statusCode).json(responseBody);
    console.log(pe.render(responseBody));
  }
}
