import { IsNotEmpty } from 'class-validator';

export class rolePermissionDto {
  @IsNotEmpty({ message: 'Role Id is required' })
  roleId: number;

  @IsNotEmpty({ message: 'Screen Permission Id is required' })
  screenPermissionId: number;
}
