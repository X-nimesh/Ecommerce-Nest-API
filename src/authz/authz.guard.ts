import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/auth/decorator';
import { PermissionServiceService } from './service/permission-service.service';
import { RoleServiceService } from './service/role-service.service';

@Injectable()
export class authzGuards implements CanActivate {
  constructor(
    private readonly roleService: RoleServiceService,
    private readonly permissionService: PermissionServiceService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<string[]>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    // * if private checking the access
    const req = context.switchToHttp().getRequest();

    // * acessing role
    const role = await this.roleService.findbyID(req.user.userId);

    // * permission role
    const permission = await this.permissionService.findbyendpoint(
      req.route.path,
      req.method,
    );

    // * checking the access
    const persmissionAcess = await this.permissionService.CheckPermission(
      permission?.id,
      role?.id,
    );
    if (persmissionAcess) {
      return true;
    } else {
      // *throw error if no permissionAcess

      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'acess denied',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
