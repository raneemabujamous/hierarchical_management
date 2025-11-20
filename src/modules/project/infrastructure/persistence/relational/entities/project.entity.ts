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
} from 'typeorm';
import { Project } from '../../../../../../packages/domins';
import { EntityRelationalHelper } from '../../../../../../utils/relational-entity-helper'
import { OrganizationEntity } from '@/modules/organization/infrastructure/persistence/relational/entities/organization.entity';
import { UserEntity } from '@/modules/user/infrastructure/persistence/relational/entities/user.entity';
import { DepartmentEntity } from '@/modules/department/infrastructure/persistence/relational/entities/department.entity';
import { TaskEntity } from '@/modules/task/infrastructure/persistence/relational/entities/task.entity';


@Entity({
  name: 'project',
})
export class ProjectEntity  {
  @PrimaryGeneratedColumn()
  project_id: number;

  @Column()
  project_title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
 
  @ManyToOne(() => DepartmentEntity, (d) => d.projects, { onDelete: 'CASCADE' })
  department: DepartmentEntity;
  
  
  @OneToMany(() => TaskEntity, (t) => t.project, { cascade: true })
  tasks: TaskEntity[];
}
