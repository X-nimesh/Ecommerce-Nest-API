import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { permissionDto } from './permission.dto';
import { PermissionEntity } from './permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  async findAll(): Promise<PermissionEntity[]> {
    return await this.permissionRepository.find();
  }

  async findOne(id: number): Promise<PermissionEntity> {
    const permission = await this.permissionRepository.findOne({
      where: { id: id },
    });
    if (!permission) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Permission not found',
      });
    }
    return permission;
  }
  async create(data: permissionDto): Promise<PermissionEntity> {
    return await this.permissionRepository.save({
      routeName: data.routeName,
      request_type: data.requestType,
      description: data.description,
    });
  }
  async update(data: permissionDto, id: number): Promise<any> {
    const permission = await this.permissionRepository.findOne({
      where: { id: id },
    });
    if (!permission) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Permission not found',
      });
    }
    await this.permissionRepository.update(id, {
      routeName: data.routeName,
      request_type: data.requestType,
      description: data.description,
    });
    return await this.permissionRepository.findOne({
      where: { id: id },
    });
  }
  async delete(id: number): Promise<any> {
    const permission = await this.permissionRepository.findOne({
      where: { id: id },
    });
    if (!permission) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Permission not found',
      });
    }
    return await this.permissionRepository.delete(id);
  }
}
