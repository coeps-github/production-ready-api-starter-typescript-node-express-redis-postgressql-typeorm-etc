import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  DNSHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator
} from '@nestjs/terminus';
import * as os from 'os';
import { TransientLoggerService } from '../logging/transient-logger.service';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly dns: DNSHealthIndicator,
    private readonly logger: TransientLoggerService
  ) {
    this.logger.setContext(HealthController.name);
  }

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
      () => this.disk.checkStorage('storage', {
        thresholdPercent: 0.9,
        path: os.platform().startsWith('win') ?
          'C:\\' :
          '/'
      }),
      () => this.dns.pingCheck('nestjs-docs', 'https://docs.nestjs.com')
    ]);
  }
}
