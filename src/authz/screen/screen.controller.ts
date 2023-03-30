import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
