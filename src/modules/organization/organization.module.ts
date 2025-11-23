import { Module } from '@nestjs/common';

import { OrganizationsController } from './organization.controller';

import { OrganizationsService } from './organization.service';
import { RelationalOrganizationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
const infrastructurePersistenceModule = RelationalOrganizationPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule,   UserModule, AuthModule, 
],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
  exports: [OrganizationsService, infrastructurePersistenceModule],
})
export class OrganizationModule {}
