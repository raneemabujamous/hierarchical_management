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
  name: 'notification',
})
export class NotificationEntity  {
  @PrimaryGeneratedColumn()
  notification_id: number;

  @ManyToOne(() => ProjectEntity, { nullable: true, onDelete: 'SET NULL' })
  project: ProjectEntity | null;
  
  
  @Column({ length: 100 })
  type: string; // e.g., 'task_update_batch'
  
  
  @Column({ type: 'text' })
  message: string;
  
  
  @Column({ type: 'json', nullable: true })
  meta: any | null; // e.g., { count: 5, taskIds: [...] }
  
  
  @Column({ default: false })
  read: boolean;
  
  
  @CreateDateColumn()
  createdAt: Date;

 


}