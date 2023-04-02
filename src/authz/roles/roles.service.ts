import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { roleDto } from './role.dto';
import { RolesEnntity } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEnntity)
    private readonly roleRepo: Repository<RolesEnntity>,
  ) {}

  async getALl() {
    return this.roleRepo.find();
  }
  async getOne(id: number) {
    return this.roleRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  async create(data: roleDto) {
    return this.roleRepo.save(data);
  }

  async update(data: roleDto, id: number) {
    const updateStatus = await this.roleRepo.update(id, data);
    if (updateStatus.affected < 1) {
      throw new NotFoundException({
        message: 'Role not found',
      });
    }
    return this.getOne(id);
  }
  async delete(id: number) {
    const deleteStatus = await this.roleRepo.delete(id);
    if (deleteStatus.affected < 1) {
      throw new NotFoundException({
        message: 'Role not found',
      });
    }
    return {
      message: 'Role deleted successfully',
    };
  }
}
