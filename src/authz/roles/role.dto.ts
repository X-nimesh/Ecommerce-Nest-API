import { IsNotEmpty } from 'class-validator';

export class roleDto {
  @IsNotEmpty({
    message: 'Role name is required',
  })
  name: string;
}
