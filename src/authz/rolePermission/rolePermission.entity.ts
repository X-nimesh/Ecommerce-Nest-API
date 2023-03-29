import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermissionEntity } from '../permission/permission.entity';
import { RolesEnntity } from '../roles/roles.entity';
import { ScreenPermissionEntity } from '../screenPermission/screenPermission.entity';

@Entity({ name: 'role_permissions' })
export class RolePermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'role_id' })
  roleId: number;

  @ManyToOne(() => RolesEnntity, (role) => role.rolePermission)
  //   @JoinTable({ name: 'role_id' })
  @JoinColumn({ name: 'role_id' })
  role: RolesEnntity;

  @Column({ name: 'screen_permission_id' })
  screenPermissionId: number;

  @ManyToOne(
    () => ScreenPermissionEntity,
    (screenPermission) => screenPermission.rolePermission,
  )
  @JoinColumn({ name: 'screen_permission_id' })
  screenPermission: ScreenPermissionEntity;

  //   @ManyToOne(() => PermissionEntity, (permission) => permission.rolePermission)
  //   //   @JoinTable({ name: 'permission_id' })
  //   @JoinColumn({ name: 'permission_id' })
  //   permission: PermissionEntity;
}
