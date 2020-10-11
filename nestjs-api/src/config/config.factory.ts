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
      wsPort: +process.env.WS_PORT || 8081,
      rateLimit: {
        windowMs: +process.env.RATE_LIMIT_WINDOW_MS || 60 * 1000,
        maxRequestsPerIpDuringWindow: +process.env.RATE_LIMIT_MAX_REQUESTS_PER_IP_DURING_WINDOW || 60,
        trustProxyClientIpHeader: parseBoolean(process.env.RATE_LIMIT_TRUST_PROXY_CLIENT_IP_HEADER) || true
      }
    }
    // jwt: {
    // privateKey: process.env.JWT_PRIVATE_KEY,
    // },
    // database: {
    // dialect: 'postgres' as Dialect,
    // host: process.env.DATABASE_HOST,
    // port: +process.env.DATABASE_PORT,
    // username: process.env.DATABASE_USER,
    // password: process.env.DATABASE_PASSWORD,
    // database: process.env.DATABASE_DATABASE,
    // dialectOptions: {
    // },
    // logging: true
    // },
  };
}