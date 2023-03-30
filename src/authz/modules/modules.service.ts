import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModuleEntity } from './module.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(ModuleEntity)
    private readonly moduleEntity: Repository<ModuleEntity>,
  ) {}

  async getAll() {
    return await this.moduleEntity.find();
  }
  async create(body) {
    return this.moduleEntity.save({ name: body.name, desc: body.description });
  }
  async update(data, id) {
    const module = await this.moduleEntity.findOne({
      where: { id },
    });
    if (!module) {
      throw new NotFoundException(
        `Module with id ${id} does not exist in the database`,
      );
    }

    const uptd = await this.moduleEntity.update(id, data);
    if (uptd.affected === 0) {
      throw new NotFoundException(
        `Module with id ${id} does not exist in the database`,
      );
    }
    return { message: 'Module updated successfully' };
  }
  async delete(id) {
    const status = await this.moduleEntity.delete(id);
    if (status.affected === 0) {
      throw new NotFoundException(
        `Module with id ${id} does not exist in the database`,
      );
    }
    return { message: 'Module deleted successfully' };
  }
}
