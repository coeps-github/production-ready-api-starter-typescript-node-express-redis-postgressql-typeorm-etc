import { Config } from './config.model';
import { parseBoolean } from './config.helper';

// TODO: Add SSL, JWT, WS, DATABASE etc. configs
export function configFactory(): Config {
  return {
    logger: {
      appName: process.env.npm_package_name,
      logLevel: process.env.LOG_LEVEL || 'info',
      logDir: process.env.LOG_DIR || 'logs',
      timestampFormat: { format: process.env.TIMESTAMP_FORMAT || 'YYYY-MM-DD HH:mm:ss.SSS' },
      printfTemplateFn: (log) => {
        const { timestamp, level, context, message, ...others } = log;
        return `${log.timestamp} ${log.level} [${log.context}] ${log.message} - ${JSON.stringify(others)}`;
      }
    },
    app: {
      name: process.env.npm_package_name,
      version: process.env.npm_package_version
    },
    server: {
      port: +process.env.PORT || 8080,
      contentSecurityPolicy: parseBoolean(process.env.CONTENT_SECURITY_POLICY, true),
      csrf: parseBoolean(process.env.CSRF, true),
      rateLimit: {
        windowMs: +process.env.RATE_LIMIT_WINDOW_MS || 60 * 1000,
        maxRequestsPerIpDuringWindow: +process.env.RATE_LIMIT_MAX_REQUESTS_PER_IP_DURING_WINDOW || 60,
        trustProxyClientIpHeader: parseBoolean(process.env.RATE_LIMIT_TRUST_PROXY_CLIENT_IP_HEADER, true)
      }
    },
    jwt: {
      secret: process.env.JWT_SECRET || ((process.env.JWT_PUBLIC_KEY || process.env.JWT_PRIVATE_KEY) ? undefined : 'secret'),
      publicKey: process.env.JWT_PUBLIC_KEY,
      privateKey: process.env.JWT_PRIVATE_KEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN || '60s'
      }
    },
    db: {
      dialect: process.env.DATABASE_DIALECT || 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: +process.env.DATABASE_PORT || 5432,
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'password',
      database: process.env.DATABASE_DATABASE || 'test',
      dialectOptions: {},
      autoLoadModels: true,
      synchronize: true,
      loggingFn: (logger, log) => logger.log(log, 'PostgresSQL')
    }
  };
}