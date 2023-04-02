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
import { roleDto } from './role.dto';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@ApiBearerAuth()
@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Get()
  async getALl() {
    return this.roleService.getALl();
  }

  @Post()
  async create(@Body() data: roleDto) {
    return this.roleService.create(data);
  }

  @Patch(':id')
  async update(@Body() data: roleDto, @Param('id') id: number) {
    return this.roleService.update(data, id);
  }

  @Delete(':id')
  delet(@Param('id') id: number) {
    return this.roleService.delete(id);
  }
}
