import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'ws';
import { AuthService } from './auth.service';
import { TransientLoggerService } from '../logging/transient-logger.service';
import { UseFilters, UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from './guards/ws-jwt-auth.guard';
import { WsExceptionFilter } from '../shared/ws-exception.filter';

@WebSocketGateway()
export class AuthGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly authService: AuthService,
    private readonly logger: TransientLoggerService
  ) {
    this.logger.setContext(AuthGateway.name);
  }

  @UseGuards(WsJwtAuthGuard)
  @UseFilters(new WsExceptionFilter('auth/user'))
  @SubscribeMessage('auth/user')
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: 'auth/user', data: item })));
  }
}