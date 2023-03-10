import { Userentity } from 'src/user/models/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItemsEntity } from './orderitems.entity';

@Entity({ name: 'orders' })
export class OrdersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Userentity, (user) => user.orders)
  @JoinColumn()
  user: Userentity;

  @OneToMany(() => OrderItemsEntity, (orderitems) => orderitems.orders)
  orderItem: OrderItemsEntity[];

  @Column()
  qty: number;

  @Column()
  price: number;

  @Column()
  status: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
