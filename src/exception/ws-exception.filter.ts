import { Catch, WsExceptionFilter as NestWsExceptionFilter } from '@nestjs/common';
import * as optional from 'optional';

const { WsException } = optional('@nestjs/websockets');

@Catch(WsException)
export class WsExceptionFilter implements NestWsExceptionFilter {
  catch(exception: any, socket: any) {
    socket.emit('exception', {
      status: 'exception',
      message: exception.getError()
    });
  }
}
