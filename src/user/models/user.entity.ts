import { OrdersEntity } from 'src/orders/models/orders.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'users' })
export class Userentity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => OrdersEntity, (order) => order.user)
  orders: OrdersEntity[];
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
