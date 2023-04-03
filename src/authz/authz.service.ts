import { Injectable } from '@nestjs/common';
import {
  InjectDataSource,
  InjectEntityManager,
  InjectRepository,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import typeOrmConfig from 'typeOrm.config';
import { ModuleEntity } from './modules/module.entity';

@Injectable()
export class AuthzService {
  constructor(
    @InjectRepository(ModuleEntity)
    private readonly moduleRepo: Repository<ModuleEntity>,
    @InjectEntityManager() private readonly entitymanager: EntityManager,
  ) {}
  async getperm(id: number) {
    const response = {
      userId: id,
      modules: [],
    };
    const query = `select
            json_build_object(
                'role',r.name,
                    'module', m.name,
                    'id',m.id,
                'screen',s.name,
                's_id',s.id,
                'route',p."routeName",
                'reqType',p.request_type
                )
        from
            modules m
        inner join screens s on m.id = s.module_id
        inner join screen_permission sp on s.id = sp.screen_id
        inner join permissions p on p.id = sp.permission_id
        inner join role_permissions rp on sp.id = rp.screen_permission_id
        inner join roles r on r.id = rp.role_id
        inner join user_roles ur on r.id = ur.role_id
        inner join users u on ur.user_id = u.id
        where u.id=$1;`;
    const result = await this.entitymanager.query(query, [id]);
    result.forEach((res) => {
      const dup = response.modules.findIndex(
        (modu) => modu.name === res.json_build_object.module,
      );
      console.log(dup);
      if (dup === -1) {
        const obj = {
          name: res.json_build_object.module,
          moduleId: res.json_build_object.id,
          screen: [
            {
              name: res.json_build_object.screen,
              sId: res.json_build_object.s_id,
              permission: {
                route: res.json_build_object.route,
                method: res.json_build_object.reqType,
              },
            },
          ],
        };
        response.modules.push(obj);
      } else {
        const scr = {
          name: res.json_build_object.screen,
          sId: res.json_build_object.s_id,
          permission: {
            route: res.json_build_object.route,
            method: res.json_build_object.reqType,
          },
        };
        console.log(response.modules[dup]);
        response.modules[dup].screen.push(scr);
      }
    });
    return response;
  }
}
