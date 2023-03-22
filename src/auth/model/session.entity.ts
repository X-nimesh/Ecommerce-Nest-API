import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { Userentity } from 'src/user/models/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'session' })
export class sessionEnity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Exclude({ toClassOnly: true })
  refreshToken: string;

  @ManyToOne(() => Userentity, (user) => user.sessions, { eager: true })
  @JoinColumn({ name: 'user_id' })
  userId: Userentity;

  @Column()
  @Exclude({ toClassOnly: true })
  session_id: string;

  @Column()
  @Exclude({ toClassOnly: true })
  expire_time: Date;
}
