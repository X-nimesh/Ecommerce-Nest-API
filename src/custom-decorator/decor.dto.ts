import { IsNotEmpty } from 'class-validator';
import { Trim } from 'src/decorator/restrim.decorator';

export class DecorDto {
  @IsNotEmpty({ message: 'products are required' })
  @Trim()
  username: string;

  @IsNotEmpty({ message: 'products are required' })
  @Trim()
  pass: string;
}
