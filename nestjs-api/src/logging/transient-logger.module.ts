import { Module } from '@nestjs/common';
import { TransientLoggerService } from './transient-logger.service';

// TODO: replace with config service dependency
const provider = {
  provide: TransientLoggerService,
  useValue: new TransientLoggerService()
};

@Module({
  providers: [provider],
  exports: [provider]
})
export class TransientLoggerModule {
}
