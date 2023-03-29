import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScreensEntity } from '../screen/screens.entity';

@Entity({ name: 'modules' })
export class ModuleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'desc' })
  desc: string;

  @OneToMany(() => ScreensEntity, (screen) => screen.modules)
  screen: ScreensEntity[];
}
