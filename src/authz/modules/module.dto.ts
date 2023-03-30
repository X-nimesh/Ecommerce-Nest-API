import { IsNotEmpty } from 'class-validator';

export class moduleDto {
  @IsNotEmpty({ message: 'Module Name is required' })
  name: string;
  @IsNotEmpty({ message: 'description is required' })
  description: string;
}
