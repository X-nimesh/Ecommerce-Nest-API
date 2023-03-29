import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Userentity } from 'src/user/models/user.entity';
import { Repository } from 'typeorm';
import { PermissionEntity } from '../permission/permission.entity';
import { RolePermissionEntity } from '../rolePermission/rolePermission.entity';
import { RolesEnntity } from '../roles/roles.entity';

@Injectable()
export class RoleServiceService {
  constructor(
    @InjectRepository(Userentity)
    private readonly userEntity: Repository<Userentity>,
    @InjectRepository(PermissionEntity)
    private readonly permissionEntity: Repository<PermissionEntity>,
    @InjectRepository(RolesEnntity)
    private readonly roleEntity: Repository<RolesEnntity>,
    @InjectRepository(RolePermissionEntity)
    private readonly rolePermissionEntity: Repository<RolePermissionEntity>,
  ) {}
  //   *try githubbbb
  async findbyID(id: number): Promise<RolesEnntity> {
    const user = await this.userEntity.findOne({
      where: { id },
    });
    console.log('users', user);
    const userRole = await this.roleEntity.findOne({
      where: { name: user.roles },
    });

    return userRole;
  }
  async hasPermission(roleId: number, permissionId: number) {
    const permission = await this.rolePermissionEntity.findOne({
      where: {
        // // permissionId: permissionId,
        roleId: roleId,
      },
    });
  }
}
