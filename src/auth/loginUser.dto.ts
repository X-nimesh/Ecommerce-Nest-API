import { IsNotEmpty, Length } from 'class-validator';

export class loginUserDto {
  @IsNotEmpty({ message: 'Email is required' })
  @Length(6, 100, { message: 'Email must be more than 6 letters' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 100, { message: 'Password must be more than 6 letters' })
  password: string;
}
