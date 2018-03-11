import { Catch, WsExceptionFilter as NestWsExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Catch(WsException)
export class WsExceptionFilter implements NestWsExceptionFilter {
  catch(exception: WsException, socket: any) {
    socket.emit('exception', {
      status: 'exception',
      message: exception.getError()
    });
  }
}
