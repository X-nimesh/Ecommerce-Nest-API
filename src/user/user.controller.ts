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
  @Public()
  @Get()
  async findAll(@Request() req: any) {
    // req.session.visits = req.session.visits ? req.session.visits + 1 : 1;

    console.log(req.session.userid);
    req.session.userid = 'nimesh';
    console.log(req.session.rand);
    return this.userService.findAll();
  }
  @Get(':id')
  async findOne(@Request() req: any) {
    console.log(req.session.rand);
    return this.userService.findOnebyId(req.params.id);
  }
  @Public()
  @Post('signup')
  async signup(@Body(new JoinValidatePipe(createUserSchema)) req: any) {
    const userDet = await this.userService.create(req);
    const response = {
      id: userDet.id,
      name: userDet.name,
      email: userDet.email,
    };
    return response;
  }
}
