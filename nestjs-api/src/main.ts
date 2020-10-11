import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransientLoggerService } from './logging/transient-logger.service';
import { ConfigService } from '@nestjs/config';
import { Config } from './config/config.model';
import { configFactory } from './config/config.factory';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import { NestExpressApplication } from '@nestjs/platform-express';

declare const module: any;

async function bootstrap() {
  const configService = new ConfigService<Config>(configFactory());

  const logger = new TransientLoggerService(configService);
  logger.setContext('Main');

  const loggerConfig = configService.get('logger');
  const appConfig = configService.get('app');
  const serverConfig = configService.get('server');

  logger.log(`LoggerConfig: ${JSON.stringify(loggerConfig)}`);
  logger.log(`AppConfig: ${JSON.stringify(appConfig)}`);
  logger.log(`ServerConfig: ${JSON.stringify(serverConfig)}`);
  // TODO: Add other configs for logging

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger,
    cors: true
    // TODO: Add https stuff
    //httpsOptions: {},
  });

  app.use(logger.expressWinstonLogger);

  app.enableShutdownHooks();

  app.use(helmet());
  app.use(cookieParser());
  if (serverConfig.csrfEnabled) {
    app.use(csurf({ cookie: { key: 'XSRF-TOKEN' } }));
  }
  app.use(rateLimit({
    windowMs: serverConfig.rateLimit.windowMs,
    max: serverConfig.rateLimit.maxRequestsPerIpDuringWindow
  }));
  if (serverConfig.rateLimit.trustProxyClientIpHeader) {
    app.set('trust proxy', 1);
  }

  const options = new DocumentBuilder()
    .setTitle(appConfig.name)
    .setDescription(`The ${appConfig.name} API description`)
    .setVersion(appConfig.version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('openapi', app, document);

  await app.listen(serverConfig.port);

  logger.log(`Application is running on: ${await app.getUrl()}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
