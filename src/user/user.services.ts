import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Userentity } from './models/user.entity';

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
    return await this.userRepo.findOne({
      where: {
        email: email,
      },
    });
  }
  async create(user: Userentity): Promise<Userentity> {
    return await this.userRepo.save(user);
  }
}
