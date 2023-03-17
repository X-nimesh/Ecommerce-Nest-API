import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Google_Auth' })
export class googelauth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  googleToken: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  avatarUrl: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
