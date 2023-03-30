import { IsNotEmpty, IsNumber } from 'class-validator';

export class screenDto {
  @IsNotEmpty({ message: 'Screen name is required' })
  name: string;

  @IsNotEmpty({ message: 'Screen description is required' })
  desc: string;

  @IsNotEmpty({ message: 'Screen module is required' })
  @IsNumber({}, { message: 'Module id must be a number' })
  moduleId: number;
}
