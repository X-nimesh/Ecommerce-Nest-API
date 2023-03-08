import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Productentity {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  name: string;

  @Column()
  decs: string;

  @Column()
  price: number;

  @Column()
  qty: number;
}
