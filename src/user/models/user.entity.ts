import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { sessionEnity } from 'src/auth/model/session.entity';
import { UserRoleEntity } from 'src/authz/userRole/userRole.entity';
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

  @Column()
  roles: string;

  @OneToMany(() => OrdersEntity, (order) => order.user)
  orders: OrdersEntity[];

  @OneToMany(() => sessionEnity, (session) => session.userId)
  sessions: sessionEnity[];

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.user)
  userRole: UserRoleEntity[];
}
