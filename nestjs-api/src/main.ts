import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransientLoggerService } from './logging/transient-logger.service';
import { ConfigService } from '@nestjs/config';
import { Config } from './config/config.model';
import { configFactory } from './config/config.factory';

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

  const app = await NestFactory.create(AppModule, {
    logger,
    // TODO: Add security stuff
    cors: true
    //httpsOptions: {},
  });

  app.enableShutdownHooks();

  const options = new DocumentBuilder()
    .setTitle(appConfig.name)
    .setDescription(`The ${appConfig.name} API description`)
    .setVersion(appConfig.version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('openapi', app, document);

  await app.listen(serverConfig.port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
