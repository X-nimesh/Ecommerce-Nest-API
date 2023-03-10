import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './controllers/auth.controller';
import { JwtStartegy } from './jwt.startegy';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretNimesh',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStartegy],
  exports: [AuthService],
})
export class AuthModule {}
