import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.services';
import * as Joi from 'joi';
import { JoinValidatePipe } from './validation.pipe';
import { Public } from 'src/auth/decorator';
import { Roles } from 'src/decorator/roles.decorators';
import { Role } from 'src/auth/authorization/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  roles: Joi.string().required().valid('admin', 'user', 'guest'),
});
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Public()
  @Get()
  @Roles(Role.Admin)
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
      roles: userDet.roles,
    };
    return response;
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async fileupload(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
