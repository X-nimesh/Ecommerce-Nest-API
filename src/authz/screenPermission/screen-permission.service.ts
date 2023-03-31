import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionService } from '../permission/permission.service';
import { ScreenService } from '../screen/screen.service';
import { ScreenPermissionDto } from './screenPermission.dto';
import { ScreenPermissionEntity } from './screenPermission.entity';

@Injectable()
export class ScreenPermissionService {
  constructor(
    @InjectRepository(ScreenPermissionEntity)
    private readonly screensPermissionRepository: Repository<ScreenPermissionEntity>,
    private readonly screenService: ScreenService,
    private readonly permissionService: PermissionService,
  ) {}

  async getAll(): Promise<ScreenPermissionEntity[]> {
    return await this.screensPermissionRepository.find();
  }
  async create(data) {
    const { screenId, permissionId } = data;

    const screen = await this.screenService.getOne(screenId);

    const permission = await this.permissionService.findOne(permissionId);

    const screenPermission = await this.screensPermissionRepository.findOne({
      where: { screenId, permissionId },
    });
    if (screenPermission) {
      return { message: 'Screen Permission already exists' };
    }
    return await this.screensPermissionRepository.save(data);
  }

  async update(data: ScreenPermissionDto, id) {
    const screen = await this.screenService.getOne(data.screenId);

    const permission = await this.permissionService.findOne(data.permissionId);
    return await this.screensPermissionRepository.update(id, data);
  }

  async delete(id: number) {
    const screenPermission = await this.screensPermissionRepository.delete(id);
    if (screenPermission.affected === 0) {
      return { message: `Screen Permission with id=${id} not found` };
    }
    return { message: 'Screen Permission deleted successfully' };
  }
}
