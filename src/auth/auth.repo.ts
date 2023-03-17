import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Userentity } from 'src/user/models/user.entity';
import { Repository } from 'typeorm';
import { googelauth } from './model/googleAuth.entity';

@Injectable()
export class authRepo {
  constructor(
    @InjectRepository(Userentity)
    private readonly userEntity: Repository<Userentity>,
    @InjectRepository(googelauth)
    private readonly googleAuth: Repository<googelauth>,
  ) {}

  async findbyEmail(email: string): Promise<googelauth> {
    return this.googleAuth.findOne({
      where: { email },
    });
  }
  async createGoogleAuth(user: any) {
    return this.googleAuth.save(user);
  }
}
