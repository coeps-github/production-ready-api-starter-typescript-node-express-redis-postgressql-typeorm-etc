import { Injectable, Scope } from '@nestjs/common';
import { WinstonLogger } from 'nest-winston';
import * as winston from 'winston';
import { NpmConfigSetLevels } from 'winston/lib/winston/config';
import { TransientLoggerServiceOptions } from './transient-logger.model';

@Injectable({ scope: Scope.TRANSIENT })
export class TransientLoggerService extends WinstonLogger {
  constructor(options?: TransientLoggerServiceOptions) {
    const defaultLogLevel: keyof NpmConfigSetLevels = options?.logLevel || 'info';
    const logDir = options?.logDir || 'logs';
    const timestampOptions = { format: options?.timestampFormat || 'YYYY-MM-DD HH:mm:ss.SSS' };
    const printfTemplateFn = options?.printfTemplateFn || ((log) => `${log.timestamp} ${log.level}: ${log.context} ${log.message}`);
    super(winston.createLogger({
      level: defaultLogLevel as string,
      levels: winston.config.npm.levels,
      transports: [
        new winston.transports.File({
          level: 'error',
          filename: 'error.log',
          dirname: logDir,
          format: winston.format.combine(
            winston.format.timestamp(timestampOptions),
            winston.format.align(),
            winston.format.printf(printfTemplateFn)
          )
        }),
        new winston.transports.File({
          filename: 'combined.log',
          dirname: logDir,
          format: winston.format.combine(
            winston.format.timestamp(timestampOptions),
            winston.format.align(),
            winston.format.printf(printfTemplateFn)
          )
        }),
        new winston.transports.Console({
          stderrLevels: ['error'],
          consoleWarnLevels: ['warn'],
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(timestampOptions),
            winston.format.align(),
            winston.format.printf(printfTemplateFn)
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
        //     winston.format.timestamp(timestampOptions),
        //     winston.format.json()
        //   )
        // })
      ]
    }));
  }
}
