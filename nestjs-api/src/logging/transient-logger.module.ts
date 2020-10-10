import { Module } from '@nestjs/common';
import { TransientLoggerService } from './transient-logger.service';

@Module({
  providers: [TransientLoggerService],
  exports: [TransientLoggerService]
})
export class TransientLoggerModule {
}
