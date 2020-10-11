import * as winston from 'winston';
import { Logger } from 'winston';
import * as expressWinston from 'express-winston';
import { FilterRequest, FilterResponse } from 'express-winston';
import { ConfigService } from '@nestjs/config';
import { Config } from '../config/config.model';

export function createWinstonLogger(configService: ConfigService<Config>) {
  const loggerConfig = configService.get('logger');
  return winston.createLogger({
    level: loggerConfig.logLevel as string,
    levels: winston.config.npm.levels,
    transports: [
      new winston.transports.File({
        level: 'error',
        filename: `${loggerConfig.appName}-error.log`,
        dirname: loggerConfig.logDir,
        format: winston.format.combine(
          winston.format.timestamp(loggerConfig.timestampFormat),
          winston.format.align(),
          winston.format.printf(loggerConfig.printfTemplateFn)
        )
      }),
      new winston.transports.File({
        filename: `${loggerConfig.appName}-combined.log`,
        dirname: loggerConfig.logDir,
        format: winston.format.combine(
          winston.format.timestamp(loggerConfig.timestampFormat),
          winston.format.align(),
          winston.format.printf(loggerConfig.printfTemplateFn)
        )
      }),
      new winston.transports.Console({
        stderrLevels: ['error'],
        consoleWarnLevels: ['warn'],
        format: winston.format.combine(
          winston.format.colorize({ all: true }),
          winston.format.timestamp(loggerConfig.timestampFormat),
          winston.format.align(),
          winston.format.printf((log) => `[${loggerConfig.appName}] ${loggerConfig.printfTemplateFn(log)}`)
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
      //     winston.format.timestamp(loggerConfig.timestampFormat),
      //     winston.format.json()
      //   )
      // })
    ]
  });
}

export function createExpressWinstonHandler(logger: Logger) {
  return expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    metaField: 'express',
    baseMeta: { context: 'Express' },
    statusLevels: true,
    expressFormat: true,
    headerBlacklist: ['cookie'],
    requestWhitelist: ['headers', 'body'],
    responseWhitelist: ['headers', 'body'],
    requestFilter: sanitizeRequest,
    responseFilter: sanitizeResponse,
    ignoreRoute: () => false
  });
}

export function sanitizeRequest(req: FilterRequest, propName: string) {
  if (req.headers && propName === 'headers') {
    // The 'if-none-match' header can break logstash JSON format
    if ('if-none-match' in req.headers) {
      req.headers['if-none-match'] = 'EXCLUDED';
    }
    // The 'authorization' header has the plaintext jwt token, we should never log it
    if (req.headers.authorization) {
      req.headers.authorization = 'Bearer [REDACTED]';
    }
    // The 'cookie' header could contain jwt tokens
    if (req.headers.cookie) {
      const cookies = req.headers.cookie.split('; ');
      req.headers.cookie = cookies
        .map((cookie) => {
          if (cookie.startsWith('AccessToken=')) {
            return 'AccessToken=REDACTED';
          }
          if (cookie.startsWith('RefreshToken=')) {
            return 'RefreshToken=REDACTED';
          }
          if (cookie.startsWith('XSRF-TOKEN')) {
            return 'XSRF-TOKEN=REDACTED';
          }
          return cookie;
        })
        .join('; ');
    }
  }
  if (req.body && propName === 'body') {
    if (req.body.password) {
      req.body.password = '[REDACTED]';
    }
  }
  return (req as any)[propName];
}

export function sanitizeResponse(res: FilterResponse, propName: string) {
  if (res.body && propName === 'body') {
    if (res.body.access_token) {
      res.body.access_token = '[REDACTED]';
    }
  }
  return (res as any)[propName];
}

