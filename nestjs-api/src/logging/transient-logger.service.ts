import { Injectable, Scope } from '@nestjs/common';
import { WinstonLogger } from 'nest-winston';
import * as winston from 'winston';
import { Logger } from 'winston';
import { Config } from '../config/config.model';
import { ConfigService } from '@nestjs/config';
import { Handler } from 'express';
import { createExpressWinstonHandler } from './transient-logger.helper';

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
    super(winston.createLogger({
      level: configService.get('logger').logLevel as string,
      levels: winston.config.npm.levels,
      transports: [
        new winston.transports.File({
          level: 'error',
          filename: `${configService.get('logger').appName}-error.log`,
          dirname: configService.get('logger').logDir,
          format: winston.format.combine(
            winston.format.timestamp(configService.get('logger').timestampFormat),
            winston.format.align(),
            winston.format.printf(configService.get('logger').printfTemplateFn)
          )
        }),
        new winston.transports.File({
          filename: `${configService.get('logger').appName}-combined.log`,
          dirname: configService.get('logger').logDir,
          format: winston.format.combine(
            winston.format.timestamp(configService.get('logger').timestampFormat),
            winston.format.align(),
            winston.format.printf(configService.get('logger').printfTemplateFn)
          )
        }),
        new winston.transports.Console({
          stderrLevels: ['error'],
          consoleWarnLevels: ['warn'],
          format: winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.timestamp(configService.get('logger').timestampFormat),
            winston.format.align(),
            winston.format.printf((log) => `[${configService.get('logger').appName}] ${configService.get('logger').printfTemplateFn(log)}`)
          )
        })
        // Configure HTTP transport or choose one from https://github.com/winstonjs/winston/blob/master/docs/transports.md
        // new winston.transports.Http({
        //   host: 'localhost',
        //   path: '/',
        //   port: 8443,
        //   ssl: true,
        //   auth: { username: 'user', password: 'password', bearer: 'token' },
        //   format: winston.format.combine(
        //     winston.format.timestamp(configService.get('logger').timestampFormat),
        //     winston.format.json()
        //   )
        // })
      ]
    }));
  }
}
