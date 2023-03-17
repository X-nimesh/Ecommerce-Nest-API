import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.services';
import { authRepo } from '../auth.repo';
import { loginUserDto } from '../loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private userservice: UserService,
    private authRepo: authRepo,
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
    if (!userDet) {
      return null;
    }
    const payload = { email: userDet.email, sub: userDet.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async googleAuth(user) {
    const userDet = {
      googleToken: user.accessToken,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const duplicateUser = await this.authRepo.findbyEmail(userDet.email);
    console.log(duplicateUser);
    if (duplicateUser) {
      const payload = { email: duplicateUser.email, sub: duplicateUser.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    const googleUser = await this.authRepo.createGoogleAuth(userDet);

    const payload = { email: googleUser.email, sub: googleUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async fbAuth(user) {
    const userDet = {
      googleToken: user.accessToken,
      email: user.email,
      name: user.name,
      avatarUrl: user.photos[0].value,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return userDet;
  }
}
