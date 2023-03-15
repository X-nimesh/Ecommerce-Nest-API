import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DataSource } from 'typeorm';
import dataSource from 'typeOrm.config';

export const transaction = () => {
  console.log('Decorator');
  const myDataSource: DataSource = dataSource;
  const queryRunner = myDataSource.createQueryRunner();
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const oldfunc = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      await queryRunner.startTransaction();
      oldfunc.apply(this, args);
    };
    // descriptor.value = myDataSource.manager.transaction(
    //   async (transactionalEntityManager) => {
    //     oldfunc();
    //   },
    // );
  };
};
// @Injectable()
// export class transactionInterceptor implements NestInterceptor {
//   async intercept(
//     context: ExecutionContext,
//     next: CallHandler,
//   ): Promise<Observable<any>> {
//     console.log('Interceptor');
//     const conn = getConnection();
//     return next.handle();
//   }
// }
