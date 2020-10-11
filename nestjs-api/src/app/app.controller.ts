import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TransientLoggerService } from '../logging/transient-logger.service';

@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: TransientLoggerService
  ) {
    this.logger.setContext(AppController.name);
  }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
