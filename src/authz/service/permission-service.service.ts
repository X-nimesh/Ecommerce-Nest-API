import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionEntity } from '../permission/permission.entity';
import { RolePermissionEntity } from '../rolePermission/rolePermission.entity';

@Injectable()
export class PermissionServiceService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionEntity: Repository<PermissionEntity>,
    @InjectRepository(RolePermissionEntity)
    private readonly rolePermissionEntity: Repository<RolePermissionEntity>,
  ) {}
  async findbyendpoint(url: string, method: string): Promise<PermissionEntity> {
    const permission = await this.permissionEntity.findOne({
      where: { routeName: url, request_type: method },
    });
    return permission;
  }
  //   *checks the permission for the role
  async CheckPermission(perId: number, rId: number): Promise<any> {
    const permisionAcess = await this.rolePermissionEntity.findOne({
      where: {
        // permissionId: perId,
        roleId: rId,
      },
    });
    return permisionAcess;
  }
}
