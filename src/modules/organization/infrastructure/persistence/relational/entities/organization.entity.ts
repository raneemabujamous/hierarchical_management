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
import { Organization } from '../../../../../../packages/domins';
import { EntityRelationalHelper } from '../../../../../../utils/relational-entity-helper'
import { ProjectEntity } from '@/modules/project/infrastructure/persistence/relational/entities/project.entity';
import { UserEntity } from '@/modules/user/infrastructure/persistence/relational/entities/user.entity';
import { DepartmentEntity } from '@/modules/department/infrastructure/persistence/relational/entities/department.entity';


@Entity({
  name: 'organization',
})
export class OrganizationEntity {
@PrimaryGeneratedColumn()
organization_id: number;


@Column({ length: 200 })
organization_title: string;


@OneToMany(() => DepartmentEntity, (d) => d.organization, { cascade: true })
departments: DepartmentEntity[];


@CreateDateColumn()
createdAt: Date;


@UpdateDateColumn()
updatedAt: Date;

@DeleteDateColumn()
 deletedAt: Date;
}
