import { Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorator';
import { ModulesService } from './modules.service';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Public()
  @Get()
  getAll() {
    return this.modulesService.getAll();
  }

  @Post()
  create() {
    return 'this is create method';
  }
}
