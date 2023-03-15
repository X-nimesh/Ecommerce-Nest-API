import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.services';
import * as Joi from 'joi';
import { JoinValidatePipe } from './validation.pipe';
import { Public } from 'src/auth/decorator';
export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req: any) {
    return this.userService.findAll();
  }
  @Get(':id')
  async findOne(@Request() req: any) {
    return this.userService.findOnebyId(req.params.id);
  }
  @Public()
  @Post('signup')
  async signup(@Body(new JoinValidatePipe(createUserSchema)) req: any) {
    return this.userService.create(req);
  }
}
