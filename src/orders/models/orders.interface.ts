export interface Order {
  id: number;
  userId: number;
  productId: number;
  qty: number;
  price: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
