import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrdersEntity } from './orders.entity';

@Entity({ name: 'order_items' })
export class OrderItemsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @ManyToOne(() => OrdersEntity, (order) => order.orderItem)
  orders: OrdersEntity;

  @Column()
  qty: number;

  @Column()
  price: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
