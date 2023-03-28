import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from './model/permission.entity';
import { RolesEnntity } from './model/roles.entity';
import { RoleServiceService } from './service/role-service.service';
import { PermissionServiceService } from './service/permission-service.service';
import { Userentity } from 'src/user/models/user.entity';
import { RolePermissionEntity } from './model/rolePermission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PermissionEntity,
      RolesEnntity,
      Userentity,
      RolePermissionEntity,
    ]),
  ],
  providers: [RoleServiceService, PermissionServiceService],
  exports: [RoleServiceService, PermissionServiceService],
})
export class AuthzModule {}
