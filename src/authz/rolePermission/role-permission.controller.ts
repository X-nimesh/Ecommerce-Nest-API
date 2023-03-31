import { Body, Controller, Get, Post } from '@nestjs/common';
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
    // return this.rolePermissionService.create();
  }
}
