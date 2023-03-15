import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Transform } from 'class-transformer';

// export const resTrim = createParamDecorator;
// (data: string, ctx: ExecutionContext) => {
//   const req = ctx.switchToHttp().getRequest();
//   console.log(req.body);
//   return req.body;
// };

// export const resTrim = (
//   target: any,
//   key: string,
//   descriptor: PropertyDescriptor,
// ) => {
//   const orginalMet = descriptor.value;
//   descriptor.value = function (...args: any[]) {
//     const name = args[0].username.split(' ');
//     args[0].username = name;
//     args[0].username.forEach((element: any, index: number) => {
//       args[0].username[index] = element.toLowerCase();
//     });
//     const result = orginalMet.apply(this, args);
//     return result;
//   };
//   return descriptor;
// };

export function Trim() {
  return Transform((value: any) => {
    // console.log(value.value);

    value.obj[value.key] = value.obj[value.key].split(' ')[0];
    return value;
  });
}
