import { Module } from '@nestjs/common';

import { ProjectsController } from './project.controller';
import { forwardRef } from '@nestjs/common';

import { ProjectsService } from './project.service';
import { RelationalProjectPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { DepartmentModule } from '../department/department.module';
const infrastructurePersistenceModule = RelationalProjectPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule,   UserModule, AuthModule, 

    forwardRef(() => DepartmentModule),

],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService, infrastructurePersistenceModule],
})
export class ProjectModule {}
