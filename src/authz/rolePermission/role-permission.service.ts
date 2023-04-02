import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NOTFOUND } from 'dns';
import { Repository } from 'typeorm';
import { RolesService } from '../roles/roles.service';
import { ScreenPermissionService } from '../screenPermission/screen-permission.service';
import { rolePermissionDto } from './rolePermisison.dto';
import { RolePermissionEntity } from './rolePermission.entity';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(RolePermissionEntity)
    private readonly rolePermissionRepository: Repository<RolePermissionEntity>,
    private readonly screenPermissionService: ScreenPermissionService,
    private readonly roleService: RolesService,
  ) {}

  async getALl() {
    return this.rolePermissionRepository.find();
  }

  async create(data: rolePermissionDto) {
    const roleData = await this.roleService.getOne(data.roleId);
    const screenPermissionData = await this.screenPermissionService.getOne(
      data.screenPermissionId,
    );
    // * Check if the role and screen permission exist
    if (!roleData || !screenPermissionData) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Role or Screen Permission not found',
      });
    }
    const role = await this.rolePermissionRepository.save(data);
    return role;
  }

  async update(data, id) {
    // * Check if the role permission exist
    const prevData = await this.rolePermissionRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!prevData) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Role Permission not found' + id,
      });
    }
    const roleData = await this.roleService.getOne(data.roleId);
    const screenPermissionData = await this.screenPermissionService.getOne(
      data.screenPermissionId,
    );
    // * Check if the role and screen permission exist
    if (!roleData || !screenPermissionData) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Role or Screen Permission not found',
      });
    }
    const role = await this.rolePermissionRepository.update(id, data);
    return this.rolePermissionRepository.findOne({ where: { id: id } });
  }

  async delete(id: number) {
    const rolePermission = await this.rolePermissionRepository.delete(id);
    if (rolePermission.affected === 0) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Role Permission not found' + id,
      });
    }
    return { message: 'Role Permission deleted successfully' };
  }
}
