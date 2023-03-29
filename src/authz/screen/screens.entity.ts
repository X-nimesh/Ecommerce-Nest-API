import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModuleEntity } from '../modules/module.entity';
import { ScreenPermissionEntity } from '../screenPermission/screenPermission.entity';

@Entity('screens')
export class ScreensEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'desc' })
  desc: string;

  @ManyToOne(() => ModuleEntity, (module) => module.screen)
  modules: ModuleEntity;

  @OneToMany(
    () => ScreenPermissionEntity,
    (ScreenPermission) => ScreenPermission.permission,
  )
  screenPermission: ScreenPermissionEntity[];
}
