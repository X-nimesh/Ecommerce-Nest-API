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
import { screenDto } from './screen.dto';
import { ScreenService } from './screen.service';

@ApiTags('Screens')
@ApiBearerAuth()
@Controller('screen')
export class ScreenController {
  constructor(private readonly screenService: ScreenService) {}

  @Get()
  getAll() {
    return this.screenService.getAll();
  }

  @Post()
  create(@Body() body: screenDto) {
    return this.screenService.create(body);
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() body: screenDto) {
    const data = { name: body.name, desc: body.desc, moduleId: body.moduleId };
    return this.screenService.update(data, id);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.screenService.delete(id);
  }
}
