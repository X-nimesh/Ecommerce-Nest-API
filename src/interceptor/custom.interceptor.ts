import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class custInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    // *reponse modifier
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        return {
          status: response.statusCode,
          //   message: `${data.message ? data.message : 'success'}`,
          message: `${req.customMessage ? req.customMessage : 'success'}`,
          data: data?.data?.length ? data.data : data || null,
        };
      }),
    );
  }
}
