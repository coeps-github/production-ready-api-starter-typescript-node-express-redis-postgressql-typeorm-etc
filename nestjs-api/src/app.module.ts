import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransientLoggerModule } from './logging/transient-logger.module';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    TransientLoggerModule,
    TerminusModule
  ],
  controllers: [
    AppController,
    HealthController
  ],
  providers: [
    AppService
  ]
})
export class AppModule {
}
