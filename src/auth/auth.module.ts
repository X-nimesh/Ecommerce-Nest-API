import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userentity } from 'src/user/models/user.entity';
import { UserModule } from 'src/user/user.module';
import { authRepo } from './auth.repo';
import { AuthController } from './controllers/auth.controller';
import { facebookStrategy } from './facebook.strategy';
import { googleStrategy } from './google.strateggy';
import { JwtStartegy } from './jwt.startegy';
import { LocalStrategy } from './local.strategy';
import { googelauth } from './model/googleAuth.entity';
import { sessionEnity } from './model/session.entity';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([googelauth, Userentity, sessionEnity]),
    PassportModule,
    JwtModule.register({
      secret: 'secretNimesh',
    }),
  ],
  controllers: [AuthController],
  providers: [
    facebookStrategy,
    AuthService,
    LocalStrategy,
    JwtStartegy,
    googleStrategy,
    authRepo,
  ],
  exports: [AuthService],
})
export class AuthModule {}
