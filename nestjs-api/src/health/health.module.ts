import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { TransientLoggerModule } from '../logging/transient-logger.module';

@Module({
  imports: [
    TransientLoggerModule,
    TerminusModule
  ],
  controllers: [
    HealthController
  ]
})
export class HealthModule {
}
