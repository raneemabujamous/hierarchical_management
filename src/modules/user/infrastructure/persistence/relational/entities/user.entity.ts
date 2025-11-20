
import {
  Column,
  AfterLoad,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  Unique,
  ManyToMany
} from 'typeorm';
import { User } from '../../../../../../packages/domins';
import { EntityRelationalHelper } from '../../../../../../utils/relational-entity-helper'
import { Exclude, Expose } from 'class-transformer';
import { OrganizationEntity } from '@/modules/organization/infrastructure/persistence/relational/entities/organization.entity';
import { ProjectEntity } from '@/modules/project/infrastructure/persistence/relational/entities/project.entity';
// import { ProjectUserEntity } from '@/modules/project/infrastructure/persistence/relational/entities/project.user.entity';
import { DepartmentEntity } from '@/modules/department/infrastructure/persistence/relational/entities/department.entity';
import { TaskEntity } from '@/modules/task/infrastructure/persistence/relational/entities/task.entity';
import { Role } from './role.enum';
@Entity({
  name: 'users',
})
@Unique(['email'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Index()
  @Column({ type: String, unique: true, nullable: true })
  email: string | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password?: string;


  @Index()
  @Column({ type: String, nullable: true })
  first_name: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  last_name: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;


  @Column({ type: 'enum', enum: Role, default: Role.EMPLOYEE })
  role: Role;



  @OneToMany(() => DepartmentEntity, (d) => d.manager)
  managedDepartments: DepartmentEntity[];


  @ManyToMany(() => TaskEntity, (t) => t.assignees)
  assignedTasks: TaskEntity[];


}
