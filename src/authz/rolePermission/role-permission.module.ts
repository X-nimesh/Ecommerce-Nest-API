import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissionController } from './role-permission.controller';
import { RolePermissionService } from './role-permission.service';
import { RolePermissionEntity } from './rolePermission.entity';
import { ScreenPermissionModule } from '../screenPermission/screen-permission.module';
import { RolesModule } from '../roles/roles.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([RolePermissionEntity]),
    ScreenPermissionModule,
    RolesModule,
  ],
  controllers: [RolePermissionController],
  providers: [RolePermissionService],
})
export class RolePermissionModule {}
