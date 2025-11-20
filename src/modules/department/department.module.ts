import { Module } from '@nestjs/common';

import { DepartmentsController } from './department.controller';

import { DepartmentsService } from './department.service';
import { RelationalDepartmentPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { OrganizationModule } from '../organization/organization.module';
import { ProjectModule } from '../project/project.module';
const infrastructurePersistenceModule = RelationalDepartmentPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule,   UserModule, AuthModule,
    OrganizationModule , ProjectModule // <- VERY IMPORTANT!
],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  exports: [DepartmentsService, infrastructurePersistenceModule],
})
export class DepartmentModule {}
