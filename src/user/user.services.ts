import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Userentity } from './models/user.entity';
import * as bcrypt from 'bcrypt';
import { userDto } from './user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Userentity)
    private userRepo: Repository<Userentity>,
  ) {}
  async findAll(): Promise<Userentity[]> {
    return await this.userRepo.find();
  }
  async findOne(email: string): Promise<Userentity> {
    try {
      return await this.userRepo.findOne({
        where: {
          email: email,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
  async findOnebyId(id: number): Promise<Userentity> {
    return await this.userRepo.findOne({
      where: {
        id: id,
      },
    });
  }
  async create(user: userDto): Promise<Userentity> {
    const exist = await this.findOne(user.email);
    if (exist) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'User already Exists',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const hashPassword = await bcrypt.hash(user.password, 10);
    console.log(hashPassword);
    const users = {
      ...user,
      refreshToken: '',
    };
    users.password = hashPassword;
    return await this.userRepo.save(users);
  }
}
