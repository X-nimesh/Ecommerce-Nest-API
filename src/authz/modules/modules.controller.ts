import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorator';
import { moduleDto } from './module.dto';
import { ModulesService } from './modules.service';
@ApiTags('modules')
@ApiBearerAuth()
@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Public()
  @Get()
  getAll() {
    return this.modulesService.getAll();
  }

  @Post()
  create(@Body() body: moduleDto) {
    return this.modulesService.create(body);
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() body: moduleDto) {
    const data = { name: body.name, desc: body.description };
    return this.modulesService.update(data, id);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.modulesService.delete(id);
  }
}
