import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { Public } from 'src/auth/decorator';
import { custInterceptor } from 'src/interceptor/custom.interceptor';
import { DecorDto } from '../decor.dto';

@Controller('decor')
export class DecorController {
  @Public()
  @Post()
  @UseInterceptors(custInterceptor)
  async create(@Body() body: DecorDto) {
    return { username: body.username, pass: body.pass };
  }
}
