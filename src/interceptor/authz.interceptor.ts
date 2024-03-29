import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleServiceService } from 'src/authz/service/role-service.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/auth/decorator';
import { PermissionServiceService } from 'src/authz/service/permission-service.service';

@Injectable()
export class authzInterceptor implements NestInterceptor {
  constructor(
    private readonly roleService: RoleServiceService,
    private readonly permissionService: PermissionServiceService,
    private reflector: Reflector,
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    // * checking if route is public or not
    const isPublic = this.reflector.get<string[]>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return next.handle();
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
      permission.id,
      role.id,
    );
    if (persmissionAcess) {
      return next.handle();
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
