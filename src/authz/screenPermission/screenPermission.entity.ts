import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermissionEntity } from '../permission/permission.entity';
import { RolePermissionEntity } from '../rolePermission/rolePermission.entity';
import { ScreensEntity } from '../screen/screens.entity';

@Entity('screen_permission')
export class ScreenPermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'screen_id' })
  screenId: number;

  @ManyToOne(() => ScreensEntity, (screens) => screens.screenPermission)
  @JoinColumn({ name: 'screen_id' })
  screen: ScreensEntity;

  @Column({ name: 'permission_id' })
  permissionId: number;

  @ManyToOne(
    () => PermissionEntity,
    (permission) => permission.screenPermission,
  )
  @JoinColumn({ name: 'permission_id' })
  permission: PermissionEntity;

  @OneToMany(
    () => RolePermissionEntity,
    (rolePermission) => rolePermission.screenPermission,
  )
  rolePermission: RolePermissionEntity[];
}
