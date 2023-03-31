import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleEntity } from '../modules/module.entity';
import { screenDto } from './screen.dto';
import { ScreensEntity } from './screens.entity';

@Injectable()
export class ScreenService {
  constructor(
    @InjectRepository(ScreensEntity)
    private readonly screenEntity: Repository<ScreensEntity>,
    @InjectRepository(ModuleEntity)
    private readonly moduleEntity: Repository<ModuleEntity>,
  ) {}
  async getAll() {
    return await this.screenEntity.find();
  }
  async getOne(id: number) {
    const screen = await this.screenEntity.findOne({
      where: {
        id: id,
      },
    });
    if (!screen) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Screen not found',
      });
    }
    return screen;
  }
  async create(body: screenDto) {
    const { moduleId } = body;
    const module = await this.moduleEntity.findOne({
      where: { id: moduleId },
    });
    if (!module) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Module not found',
      });
    }
    return await this.screenEntity.save({
      name: body.name,
      desc: body.desc,
      moduleId: module.id,
    });
  }

  async update(body: screenDto, id) {
    const { moduleId } = body;
    const module = await this.moduleEntity.findOne({
      where: { id: moduleId },
    });
    if (!module) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Module not found',
      });
    }
    const screen = await this.screenEntity.findOne({
      where: {
        id: id,
      },
    });
    if (!screen) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Screen not found',
      });
    }
    const screenEntity = await this.screenEntity.update(id, {
      name: body.name,
      desc: body.desc,
      moduleId: module.id,
    });
    if (screenEntity.affected === 0) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Screen not found',
      });
    }
    return await this.screenEntity.findOne({
      where: {
        id: id,
      },
    });
  }
  async delete(id) {
    const screenEntity = await this.screenEntity.delete(id);
    if (screenEntity.affected === 0) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Screen not found',
      });
    }
    return { message: 'Screen deleted successfully' };
  }
}
