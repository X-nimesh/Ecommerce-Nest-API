import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ScreenPermissionService } from './screen-permission.service';
import { ScreenPermissionDto } from './screenPermission.dto';

@ApiTags('Screen Permission')
@ApiBearerAuth()
@Controller('screen-permission')
export class ScreenPermissionController {
  constructor(
    private readonly screenPermissionService: ScreenPermissionService,
  ) {}

  @Get()
  async getAll() {
    return await this.screenPermissionService.getAll();
  }

  @Post()
  async create(@Body() body: ScreenPermissionDto) {
    return await this.screenPermissionService.create(body);
  }
  @Patch('/:id')
  async update(@Body() body: ScreenPermissionDto, @Param('id') id: number) {
    return await this.screenPermissionService.update(body, id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return await this.screenPermissionService.delete(id);
  }
}
