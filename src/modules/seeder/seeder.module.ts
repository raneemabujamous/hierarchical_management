import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { OrganizationEntity } from '@/modules/organization/infrastructure/persistence/relational/entities/organization.entity';
import { DepartmentEntity } from '@/modules/department/infrastructure/persistence/relational/entities/department.entity';
import { ProjectEntity } from '@/modules/project/infrastructure/persistence/relational/entities/project.entity';
import { TaskEntity } from '@/modules/task/infrastructure/persistence/relational/entities/task.entity';
import { SeederController } from './seeder.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationEntity, DepartmentEntity, ProjectEntity, TaskEntity])],
  providers: [SeederService],
  exports: [SeederService],
  controllers: [SeederController],

})
export class SeederModule {}
