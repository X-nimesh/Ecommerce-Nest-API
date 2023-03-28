import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { typeOrmConfigs } from './config/dbConnection.config';
import { CustomDecoratorModule } from './custom-decorator/custom-decorator.module';
import { RolesGuard } from './auth/authorization/roles.guard';
import { AuthzModule } from './authz/authz.module';
import { AuthzMiddelware } from './middelware/authz.middle';
import { authzInterceptor } from './interceptor/authz.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfigs()),
    ProductModule,
    UserModule,
    OrdersModule,
    AuthModule,
    CustomDecoratorModule,
    AuthzModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    { provide: APP_INTERCEPTOR, useClass: authzInterceptor },
  ],
})
export class AppModule {}
