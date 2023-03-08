import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Userentity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private userRepo: Repository<Userentity>,
  ) {}
}
