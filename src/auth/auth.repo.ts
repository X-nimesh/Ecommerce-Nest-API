import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Userentity } from 'src/user/models/user.entity';
import { Repository } from 'typeorm';
import { googelauth } from './model/googleAuth.entity';
import { sessionEnity } from './model/session.entity';

@Injectable()
export class authRepo {
  constructor(
    @InjectRepository(Userentity)
    private readonly userEntity: Repository<Userentity>,
    @InjectRepository(googelauth)
    private readonly googleAuth: Repository<googelauth>,
    @InjectRepository(sessionEnity)
    private readonly sessionEntity: Repository<sessionEnity>,
  ) {}

  async findbyEmail(email: string): Promise<googelauth> {
    return this.googleAuth.findOne({
      where: { email },
    });
  }
  async updateRefreshToken(id: any, refreshToken: string, sessionID: string) {
    // *delete the previous session
    const deleted = await this.sessionEntity.delete({ userId: id });
    const myDate = new Date();

    // add 5 days to the date object
    // myDate.setDate(myDate.getDate() + 5);
    // *add 24 h to the date object
    myDate.setHours(myDate.getHours() + 24);
    //   *insert the new session
    const sessionD = await this.sessionEntity.save({
      refreshToken,
      session_id: sessionID,
      expire_time: myDate,
      userId: id,
    });
    //   const sessionD = await this.sessionEntity.save(sessionDet);
    return sessionD;
  }
  async createGoogleAuth(user: any) {
    return this.googleAuth.save(user);
  }
  async findSession(sessionID: string) {
    const sessionDet = await this.sessionEntity.findOne({
      where: { session_id: sessionID },
    });
    console.log(sessionDet);
    return sessionDet;
  }
}
