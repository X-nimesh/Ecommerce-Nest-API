import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from '../permission/permission.module';
import { PermissionService } from '../permission/permission.service';
import { ScreenModule } from '../screen/screen.module';
import { ScreenService } from '../screen/screen.service';
import { ScreenPermissionController } from './screen-permission.controller';
import { ScreenPermissionService } from './screen-permission.service';
import { ScreenPermissionEntity } from './screenPermission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScreenPermissionEntity]),
    ScreenModule,
    PermissionModule,
  ],
  controllers: [ScreenPermissionController],
  providers: [ScreenPermissionService],
})
export class ScreenPermissionModule {}
