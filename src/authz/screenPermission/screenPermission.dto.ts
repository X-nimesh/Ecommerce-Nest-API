import { IsNotEmpty } from 'class-validator';

export class ScreenPermissionDto {
  @IsNotEmpty({ message: 'Screen Id is required' })
  screenId: number;

  @IsNotEmpty({ message: 'Permission Id is required' })
  permissionId: number;
}
