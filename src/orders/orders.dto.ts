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
export class orderDto {
  qty: number;
  price: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}
