import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ImageModule } from './image/image.module';
import { CustomFilter } from './filters/custom.filter';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { join } from 'path';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.inventory',
      isGlobal: true,
      load: [configuration]
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_DIALECT as any,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: false,
      maxQueryExecutionTime: 3000
    }),
    AuthModule,
    ImageModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    /** 
     *  -- Global Control Authentication --
     *  This class can not get DI container service
     *  Because this class initialized before DI create
     */
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_FILTER, useClass: CustomFilter }
  ],
})

export class AppModule { }
