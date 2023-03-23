import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  generateToken(user) {
    return {
      access_token: this.jwtService.sign(user, {
        expiresIn: '1m',
      }),
      refresh_token: this.jwtService.sign(user, {
        expiresIn: '2m',
      }),
    };
  }

  async login(user: loginUserDto, sessionID: any) {
    const userDet = await this.validateUser(user.email, user.password);
    // *email and password not found
    if (!userDet) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Invalid email and Password',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // *generateToken
    const payload = {
      email: userDet.email,
      sub: userDet.id,
      roles: userDet.roles,
    };
    const tokens = this.generateToken(payload);
    // *update refresh token
    const status = await this.authRepo.updateRefreshToken(
      userDet.id,
      tokens.refresh_token,
      sessionID,
    );

    return tokens;
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

  async refreshToken(body, sessionID) {
    // return { body };
    console.log({ data: body, session: sessionID });
    try {
      const refresh = this.jwtService.verify(body.refreshToken);
      console.log(refresh);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Refresh Token has expired',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const Session = await this.authRepo.findSession(sessionID);
    //   console.log(Session);
    if (Session?.refreshToken !== body.refreshToken) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Invalid refresh token',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const userID = Session?.userId.id;
    const user = await this.userservice.findOnebyId(userID);
    const payload = { email: user.email, sub: user.id };
    const tokens = this.generateToken(payload);
    // *update refresh token
    const status = await this.authRepo.updateRefreshToken(
      user.id,
      tokens.refresh_token,
      sessionID,
    );
    return tokens;
  }
}
