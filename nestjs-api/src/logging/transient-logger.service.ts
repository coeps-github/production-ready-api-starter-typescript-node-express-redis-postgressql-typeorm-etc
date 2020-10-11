import { Injectable, Scope } from '@nestjs/common';
import { WinstonLogger } from 'nest-winston';
import { Logger } from 'winston';
import { Config } from '../config/config.model';
import { ConfigService } from '@nestjs/config';
import { Handler } from 'express';
import { createExpressWinstonHandler, createWinstonLogger } from './transient-logger.helper';

class PublicWinstonLogger extends WinstonLogger {
  public readonly expressWinstonLogger: Handler;

  constructor(private readonly winstonLogger: Logger) {
    super(winstonLogger);
    this.expressWinstonLogger = createExpressWinstonHandler(winstonLogger);
  }
}

@Injectable({ scope: Scope.TRANSIENT })
export class TransientLoggerService extends PublicWinstonLogger {
  constructor(private readonly configService: ConfigService<Config>) {
    super(createWinstonLogger(configService));
  }
}
