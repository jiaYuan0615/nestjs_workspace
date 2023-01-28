import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import configuration from './config/configuration';
import { EcommerceController } from './ecommerce.controller';
import { EcommerceService } from './ecommerce.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.ecommerce',
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
  ],
  controllers: [
    EcommerceController
  ],
  providers: [
    EcommerceService
  ],
})
export class EcommerceModule { }
