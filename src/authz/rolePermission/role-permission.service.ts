import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { rolePermissionDto } from './rolePermisison.dto';
import { RolePermissionEntity } from './rolePermission.entity';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(RolePermissionEntity)
    private readonly rolePermissionRepository: Repository<RolePermissionEntity>,
  ) {}

  async getALl() {
    return this.rolePermissionRepository.find();
  }

  async create(data: rolePermissionDto) {
    // const role =await this
  }
}
