import { IsNotEmpty } from 'class-validator';

export class ordersDto {
  @IsNotEmpty({ message: 'products are required' })
  products: product[];
}
interface product {
  productId: number;
  quantity: number;
  price: number;
}
