import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { custInterceptor } from './interceptor/custom.interceptor';
import * as session from 'express-session';
import { authzInterceptor } from './interceptor/authz.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'secretnimesh7',
      resave: false,
      saveUninitialized: false,
      proxy: true,
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  //   app.useGlobalInterceptors(new authzInterceptor());
  //   app.useGlobalInterceptors(new custInterceptor());
  app.enableCors({
    origin: 'http://127.0.0.1:5500',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
