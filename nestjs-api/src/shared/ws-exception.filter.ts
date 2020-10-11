import { ArgumentsHost, Catch, WsExceptionFilter as WsExceptionFilterInterface } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Catch()
export class WsExceptionFilter implements WsExceptionFilterInterface<WsException> {
  constructor(private readonly event: string) {
  }

  catch(exception: Error, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();
    const data = JSON.stringify({
      event: this.event,
      data: exception
    });
    client.send(data);
  }
}