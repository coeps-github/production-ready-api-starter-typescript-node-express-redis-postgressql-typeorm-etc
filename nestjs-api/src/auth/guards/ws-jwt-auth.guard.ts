import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const data = context.switchToWs().getData();
    const jwtPayload = this.jwtService.verify(data.access_token);
    const user = await this.authService.validateUserIdAndUsername(jwtPayload.userId, jwtPayload.username);
    if (!user) {
      throw new WsException('Unauthorized');
    }
    context.switchToWs().getData().user = user;
    return true;
  }
}