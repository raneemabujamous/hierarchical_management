import { Module } from '@nestjs/common';

import { TasksController } from './task.controller';

import { TasksService } from './task.service';
import { RelationalTaskPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ProjectModule } from '../project/project.module';
import { NotificationModule } from '../notification/notification.module';
const infrastructurePersistenceModule = RelationalTaskPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule,   UserModule, AuthModule,ProjectModule , NotificationModule
],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService, infrastructurePersistenceModule],
})
export class TaskModule {}
