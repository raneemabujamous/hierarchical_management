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
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Task } from '../../../../../../packages/domins';
import { EntityRelationalHelper } from '../../../../../../utils/relational-entity-helper'
import { OrganizationEntity } from '@/modules/organization/infrastructure/persistence/relational/entities/organization.entity';
import { UserEntity } from '@/modules/user/infrastructure/persistence/relational/entities/user.entity';
import { ProjectEntity } from '@/modules/project/infrastructure/persistence/relational/entities/project.entity';
//import { TaskUserEntity } from './task.user.entity';

@Entity({
  name: 'task',
})
export class TaskEntity {
@PrimaryGeneratedColumn()
task_id: number;


@Column({ length: 500 })
task_title: string;


@Column({ type: 'text', nullable: true })
description: string;


@Column({ length: 50, default: 'todo' })
status: string;


@ManyToOne(() => ProjectEntity, (p) => p.tasks, { onDelete: 'CASCADE' })
project: ProjectEntity;

@ManyToMany(() => UserEntity, (u) => u.assignedTasks)
@JoinTable({ name: 'task_assignees' })
assignees: UserEntity[];


@Column({ default: false })
archived: boolean;


@CreateDateColumn()
createdAt: Date;


@UpdateDateColumn()
updatedAt: Date;
}