import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Name is required' })
  readonly name: string;

  @IsString({ message: 'Description is required' })
  readonly decs: string;

  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber()
  readonly price: number;

  @IsNotEmpty({ message: 'Quantity is required' })
  @Min(1, { message: 'Quantity must be greater than 0' })
  @IsNumber()
  readonly qty: number;
}
