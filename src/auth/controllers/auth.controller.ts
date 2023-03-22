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
  async login(@Body() body: loginUserDto, @Req() req) {
    // console.log(`before ${req.session.userid}`);
    req.session.userid = 'nimesh';
    // console.log(req.session.userid);
    return await this.authService.login(body, req.sessionID);
  }

  @Post('refresh')
  @Public()
  @HttpCode(200)
  async refresh(@Body() body: { refreshToken: string }, @Req() req) {
    return this.authService.refreshToken(body, req.sessionID);
  }
  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req) {
    return req.user;
  }
  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req) {
    const response = this.authService.googleAuth(req.user);
    return response;
  }

  @Public()
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async fbauth(@Req() req) {
    return req.user;
  }
  @Public()
  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facbookCallBack(@Req() req) {
    return this.authService.fbAuth(req.user);
  }
}
