import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransientLoggerModule } from '../logging/transient-logger.module';
import { ConfigModule } from '@nestjs/config';
import { configFactory } from '../config/config.factory';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { EventModule } from '../event/event.module';
import { HealthModule } from '../health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configFactory]
    }),
    TransientLoggerModule,
    AuthModule,
    UsersModule,
    EventModule,
    HealthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'www'),
      exclude: ['/api*']
    })
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ]
})
export class AppModule {
}
