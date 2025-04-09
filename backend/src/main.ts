import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT_NEST || 3000;
  const version = require('../package.json').version;
  const description = require('../package.json').description;

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('CMPC Libros API')
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => {
    Logger.log(
      `Server running on Port: ${port} -- v${version}`,
      'NestApplication',
    );
  });
}
bootstrap();
