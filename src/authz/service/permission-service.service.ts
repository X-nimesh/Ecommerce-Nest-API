import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionEntity } from '../model/permission.entity';

@Injectable()
export class PermissionServiceService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionEntity: Repository<PermissionEntity>,
  ) {}
  async findbyendpoint(url: string, method: string): Promise<PermissionEntity> {
    const permission = await this.permissionEntity.findOne({
      where: { name: url, request_type: method },
    });
    return permission;
  }
}
