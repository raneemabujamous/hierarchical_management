import { Module } from '@nestjs/common';
import { NotificationRepository } from '../notification.repository';
import { NotificationsRelationalRepository } from './repositories/notification.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity , ])],
  providers: [
    {
      provide: NotificationRepository,
      useClass: NotificationsRelationalRepository,
    },
  ],
  exports: [NotificationRepository],
})
export class RelationalNotificationPersistenceModule {}
