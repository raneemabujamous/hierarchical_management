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
import { ProjectEntity } from '@/modules/project/infrastructure/persistence/relational/entities/project.entity';

@Entity({
  name: 'notification',
})
export class NotificationEntity  {
  @PrimaryGeneratedColumn()
  notification_id: number;

  @Column({ type: 'text' })
  message: string;

  @ManyToOne(() => ProjectEntity, { nullable: true })
  project: ProjectEntity;

  @CreateDateColumn()
  createdAt: Date;

 


}