import { Injectable, NestMiddleware } from '@nestjs/common';
import { PermissionServiceService } from 'src/authz/service/permission-service.service';
import { RoleServiceService } from 'src/authz/service/role-service.service';

@Injectable()
export class AuthzMiddelware implements NestMiddleware {
  constructor(
    private readonly roleService: RoleServiceService,
    private readonly permissionService: PermissionServiceService,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    // const userRole = await this.roleService.findbyID(req);
    console.log(req);
  }
}
