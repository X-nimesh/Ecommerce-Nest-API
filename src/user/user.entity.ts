import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Userentity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
