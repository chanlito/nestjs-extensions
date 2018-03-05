import { Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class ApplicationExceptionFilter implements ExceptionFilter {
  catch(err: any, res: any) {
    const errTitle = `\n ¯\\_(ツ)_/¯ Meh, it's just an error! Don't worry about it. \n`;

    const statusCode = err.getStatus();
    const response = err.getResponse();

    if (typeof response === 'string') {
      console.error(errTitle, response);
      res.status(statusCode).json({
        statusCode,
        message: response
      });
    } else if (typeof response.message === 'string') {
      console.error(errTitle, response.message);
      res.status(statusCode).json({
        statusCode,
        message: response.message
      });
    } else {
      console.error(errTitle, response.message);
      res.status(statusCode).json({
        statusCode,
        ...response.message
      });
    }
  }
}
