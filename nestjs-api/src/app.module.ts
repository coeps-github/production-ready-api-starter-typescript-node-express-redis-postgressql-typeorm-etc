import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransientLoggerModule } from './logging/transient-logger.module';

@Module({
  imports: [
    TransientLoggerModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    Logger
  ]
})
export class AppModule {
}
