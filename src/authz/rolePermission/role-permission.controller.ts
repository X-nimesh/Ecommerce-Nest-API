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
import { RolePermissionService } from './role-permission.service';
import { rolePermissionDto } from './rolePermisison.dto';

@ApiTags('Role  Permission')
@ApiBearerAuth()
@Controller('role-permission')
export class RolePermissionController {
  constructor(private readonly rolePermissionService: RolePermissionService) {}
  @Get()
  async getALl() {
    return this.rolePermissionService.getALl();
  }

  @Post()
  async create(@Body() data: rolePermissionDto) {
    return this.rolePermissionService.create(data);
  }
  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: rolePermissionDto) {
    return this.rolePermissionService.update(data, id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.rolePermissionService.delete(id);
  }
}
