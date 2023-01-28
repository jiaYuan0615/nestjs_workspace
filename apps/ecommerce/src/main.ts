import { NestFactory } from '@nestjs/core';
import { EcommerceModule } from './ecommerce.module';
import helmet from 'helmet';
import express from 'express';
import cookieParser from 'cookie-parser';
import nocache from 'nocache';
import _ from 'lodash';
import morgan from 'morgan';
import compression from 'compression';
import session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(EcommerceModule, {
    cors: true,
    logger: ['error', 'warn'],
  });

  app.use(helmet());
  app.use(cookieParser());
  app.use(nocache());
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }));
  app.use(compression());
  const status = _.lowerCase(process.env.APP_ENV) === 'development' ? 'dev' : 'tiny';
  app.use(morgan(status))

  app.setGlobalPrefix('api')

  const swagger = new DocumentBuilder()
    .setTitle(process.env.APP_PLATFORM)
    .setDescription(process.env.APP_PLATFORM_DESCRIPTION)
    .setVersion(process.env.APP_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, swagger);
  if (process.env.APP_ENV.toLowerCase() === 'development') SwaggerModule.setup('docs', app, document);



  app.use(session({
    secret: process.env.APP_KEY,
    resave: false,
    saveUninitialized: false,
  }))


  await app.listen(process.env.APP_PORT);
  const route = `${process.env.APP_PROTOCOL}://${process.env.APP_HOST}:${process.env.APP_PORT}`;
  console.log(`Server is now activation on: ${route}/api`);
  if (process.env.APP_ENV.toLowerCase() === 'development') console.log(`Swagger Documentation is on: ${route}/docs`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
