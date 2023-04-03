import { Body, Controller, Get, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthzService } from './authz.service';
@ApiBearerAuth()
@ApiTags('auth')
@Controller('authz')
export class AuthzController {
  constructor(private readonly authzService: AuthzService) {}
  @Get()
  async getScreens(@Body() data: any, @Req() req) {
    return this.authzService.getperm(req.user.userId);
  }
}
