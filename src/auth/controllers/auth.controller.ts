import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Public } from '../decorator';
import { LocalAppguard } from '../local-auth.guard';
import { loginUserDto } from '../loginUser.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  //   @UseGuards(LocalAppguard)
  @Post('login')
  @HttpCode(200)
  async login(@Body() body: loginUserDto) {
    return this.authService.login(body);
  }
}
