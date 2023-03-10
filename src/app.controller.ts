import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAppguard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //   @UseGuards(LocalAppguard)
  //   @Post('auth/login')
  //   async login(@Request() req) {
  //     return req.user;
  //   }
}
