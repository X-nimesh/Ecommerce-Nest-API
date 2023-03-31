import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from './permission/permission.entity';
import { RolesEnntity } from './roles/roles.entity';
import { RoleServiceService } from './service/role-service.service';
import { PermissionServiceService } from './service/permission-service.service';
import { Userentity } from 'src/user/models/user.entity';
import { RolePermissionEntity } from './rolePermission/rolePermission.entity';
import { ModuleEntity } from './modules/module.entity';
import { ScreensEntity } from './screen/screens.entity';
import { ScreenPermissionEntity } from './screenPermission/screenPermission.entity';
import { ModulesModule } from './modules/modules.module';
import { ScreenModule } from './screen/screen.module';
import { PermissionModule } from './permission/permission.module';
import { ScreenPermissionModule } from './screenPermission/screen-permission.module';
import { RolePermissionModule } from './rolePermission/role-permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PermissionEntity,
      RolesEnntity,
      RolePermissionEntity,
      ModuleEntity,
      ScreensEntity,
      ScreenPermissionEntity,
      Userentity,
    ]),
    ModulesModule,
    ScreenModule,
    PermissionModule,
    ScreenPermissionModule,
    RolePermissionModule,
  ],
  providers: [RoleServiceService, PermissionServiceService],
  exports: [RoleServiceService, PermissionServiceService],
})
export class AuthzModule {}
