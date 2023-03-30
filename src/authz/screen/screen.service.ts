import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { screenDto } from './screen.dto';
import { ScreensEntity } from './screens.entity';

@Injectable()
export class ScreenService {
  constructor(
    @InjectRepository(ScreensEntity)
    private readonly screenEntity: Repository<ScreensEntity>,
  ) {}
  async getAll() {
    return await this.screenEntity.find();
  }

  async create(body: screenDto) {
    return await this.screenEntity.save({
      name: body.name,
      desc: body.desc,
      module: body.moduleId,
    });
  }
}
