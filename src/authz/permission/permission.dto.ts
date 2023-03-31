import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class permissionDto {
  @ApiProperty({ type: String, name: 'routeName' })
  @IsNotEmpty({ message: 'Route Name is required' })
  routeName: string;

  @ApiProperty({ type: String, name: 'requestType' })
  @IsNotEmpty({ message: 'Req method is required' })
  requestType: string;

  @ApiProperty({ type: String, name: 'description' })
  @IsNotEmpty({ message: 'description is required' })
  description: string;
}
