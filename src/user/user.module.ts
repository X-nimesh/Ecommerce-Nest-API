import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { Userentity } from './models/user.entity';
import { UserService } from './user.services';

@Module({
  imports: [TypeOrmModule.forFeature([Userentity])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
