import { Global, Module } from '@nestjs/common';
import { TransientLoggerService } from './transient-logger.service';

@Global()
@Module({
  providers: [TransientLoggerService],
  exports: [TransientLoggerService]
})
export class TransientLoggerModule {
}
