import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TransientLoggerService } from './logging/transient-logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: TransientLoggerService
  ) {
    this.logger.setContext('AppController');
    this.logger.error('erröööör', 'asdf');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
