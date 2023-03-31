import {
  Column,
  Entity,
  JoinColumn,
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

  @Column({ name: 'module_id' })
  moduleId: number;

  @ManyToOne(() => ModuleEntity, (module) => module.screen)
  @JoinColumn({ name: 'module_id' })
  modules: ModuleEntity;

  @OneToMany(
    () => ScreenPermissionEntity,
    (ScreenPermission) => ScreenPermission.permission,
  )
  screenPermission: ScreenPermissionEntity[];
}
