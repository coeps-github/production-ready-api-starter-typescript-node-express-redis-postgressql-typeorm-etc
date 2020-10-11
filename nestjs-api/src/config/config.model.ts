import { NpmConfigSetLevels } from 'winston/lib/winston/config';
import * as winston from 'winston';

export interface Config {
  logger: LoggerConfig;
  app: AppConfig;
  server: ServerConfig;
}

export interface LoggerConfig {
  readonly appName: string;
  readonly logLevel: keyof NpmConfigSetLevels;
  readonly logDir: string;
  readonly timestampFormat: { format: string; };
  readonly printfTemplateFn: (log: winston.Logform.TransformableInfo | Record<string, unknown>) => string;
}

export interface AppConfig {
  readonly name: string;
  readonly version: string;
}

export interface ServerConfig {
  readonly port: number;
  readonly contentSecurityPolicy: boolean;
  readonly csrf: boolean;
  readonly rateLimit: {
    readonly windowMs: number;
    readonly maxRequestsPerIpDuringWindow: number
    readonly trustProxyClientIpHeader: boolean
  }
}