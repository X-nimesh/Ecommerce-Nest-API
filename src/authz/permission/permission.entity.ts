import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScreenPermissionEntity } from '../screenPermission/screenPermission.entity';

@Entity({ name: 'permissions' })
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, name: '' })
  routeName: string;

  @Column({ type: 'varchar', length: 15 })
  request_type: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  //   @OneToMany(
  //     () => RolePermissionEntity,
  //     (rolePermission) => rolePermission.permission,
  //   )
  //   rolePermission: RolePermissionEntity[];

  @OneToMany(
    () => ScreenPermissionEntity,
    (ScreenPermission) => ScreenPermission.permission,
  )
  screenPermission: ScreenPermissionEntity[];
}
