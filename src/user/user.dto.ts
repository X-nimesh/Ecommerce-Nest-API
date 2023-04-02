import { IsNotEmpty } from 'class-validator';

export class userDto {
  @IsNotEmpty({
    message: 'name is required',
  })
  name: string;

  @IsNotEmpty({
    message: 'name is required',
  })
  email: string;

  @IsNotEmpty({
    message: 'Password is required',
  })
  password: string;

  @IsNotEmpty({
    message: 'Roles is required',
  })
  roles: string;
}
