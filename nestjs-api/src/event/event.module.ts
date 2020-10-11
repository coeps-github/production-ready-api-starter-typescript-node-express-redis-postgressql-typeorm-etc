import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';
import { TransientLoggerModule } from '../logging/transient-logger.module';

@Module({
  imports: [TransientLoggerModule],
  providers: [EventGateway]
})
export class EventModule {
}