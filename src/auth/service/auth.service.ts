import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.services';
import { loginUserDto } from '../loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private userservice: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userservice.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: loginUserDto) {
    const userDet = await this.validateUser(user.email, user.password);
    console.log(userDet);
    const payload = { email: userDet.email, sub: userDet.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
