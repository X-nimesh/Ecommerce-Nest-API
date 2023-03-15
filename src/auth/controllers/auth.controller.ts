import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req) {
    return req.user;
  }
  @Public()
  @Get('google/callback')
  googleLoginCallback(@Req() req) {
    console.log(req.user);
    return 'google login callback';
  }
}
