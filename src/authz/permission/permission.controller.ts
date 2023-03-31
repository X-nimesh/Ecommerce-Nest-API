import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { permissionDto } from './permission.dto';
import { PermissionEntity } from './permission.entity';
import { PermissionService } from './permission.service';

@ApiTags('Permission')
@ApiBearerAuth()
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  async findAll() {
    return await this.permissionService.findAll();
  }

  @ApiBody({
    type: permissionDto,
  })
  @Post()
  async create(@Body() body: permissionDto) {
    return await this.permissionService.create(body);
  }

  @Patch(':id')
  async update(@Body() body: permissionDto, @Param('id') id: number) {
    return await this.permissionService.update(body, id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.permissionService.delete(id);
  }
}
