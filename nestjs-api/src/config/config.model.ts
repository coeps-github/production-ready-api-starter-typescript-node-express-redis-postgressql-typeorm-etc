import { NpmConfigSetLevels } from 'winston/lib/winston/config';
import * as winston from 'winston';
import { TransientLoggerService } from '../logging/transient-logger.service';

export interface Config {
  readonly logger: LoggerConfig;
  readonly app: AppConfig;
  readonly server: ServerConfig;
  readonly jwt: JwtConfig;
  readonly db: DbConfig;
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

export interface JwtConfig {
  readonly secret: string;
  readonly publicKey: string;
  readonly privateKey: string;
  readonly signOptions: {
    readonly expiresIn: string;
  }
}

export interface DbConfig {
  readonly dialect: string;
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string;
  readonly database: string;
  readonly dialectOptions: Record<string, unknown>;
  readonly autoLoadModels: boolean;
  readonly synchronize: boolean;
  readonly loggingFn: (logger: TransientLoggerService, log: Record<string, unknown>) => string;
}