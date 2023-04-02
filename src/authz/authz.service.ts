import { Injectable } from '@nestjs/common';
import {
  InjectDataSource,
  InjectRepository,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import typeOrmConfig from 'typeOrm.config';
import { ModuleEntity } from './modules/module.entity';

@Injectable()
export class AuthzService {
  constructor(
    @InjectRepository(ModuleEntity)
    private readonly moduleRepo: Repository<ModuleEntity>,
  ) {}
  async getperm(data) {
    return this.moduleRepo.query(`
    select
    json_build_object(
        'role',r.name,
            'module name', m.name,
            'id',m.id,
        'screen',s.name,
        's_id',s.id,
        'route',p."routeName",
        'Req Type',p.request_type
        )
from
    modules m
inner join screens s on m.id = s.module_id
inner join screen_permission sp on s.id = sp.screen_id
inner join permissions p on p.id = sp.permission_id
inner join role_permissions rp on sp.id = rp.screen_permission_id
inner join roles r on r.id = rp.role_id where r.id=1;`);
  }
}
