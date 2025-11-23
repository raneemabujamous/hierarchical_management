import { Module } from '@nestjs/common';

import { NotificationsController } from './notification.controller';

import { NotificationsService } from './notification.service';
import { RelationalNotificationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
const infrastructurePersistenceModule = RelationalNotificationPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule,   UserModule, AuthModule, 
],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService, infrastructurePersistenceModule],
})
export class NotificationModule {}
