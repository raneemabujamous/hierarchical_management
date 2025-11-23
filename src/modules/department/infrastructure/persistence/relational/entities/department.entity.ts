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
  Unique
} from 'typeorm';
import { Department } from '../../../../../../packages/domins';
import { EntityRelationalHelper } from '../../../../../../utils/relational-entity-helper'
import { ProjectEntity } from '@/modules/project/infrastructure/persistence/relational/entities/project.entity';
import { UserEntity } from '@/modules/user/infrastructure/persistence/relational/entities/user.entity';
import { OrganizationEntity } from '@/modules/organization/infrastructure/persistence/relational/entities/organization.entity';

@Entity({
  name: 'department',
})
export class DepartmentEntity {
@PrimaryGeneratedColumn()
department_id: number;


@Column({ length: 200 })
department_title: string;


@ManyToOne(() => OrganizationEntity, (o) => o.departments, { onDelete: 'CASCADE' })
organization: OrganizationEntity;


@ManyToOne(() => UserEntity, (u) => u.managedDepartments, { nullable: true, onDelete: 'SET NULL' })
manager: UserEntity | null;


@OneToMany(() => ProjectEntity, (p) => p.department, { cascade: true })
projects: ProjectEntity[];


@CreateDateColumn()
createdAt: Date;


@UpdateDateColumn()
updatedAt: Date;
}