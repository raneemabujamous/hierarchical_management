import {
  Injectable,
} from '@nestjs/common';
import { NotificationRepository } from './infrastructure/persistence/notification.repository';
import { NullableType } from '@/utils/types/nullable.type';
import { EntityCondition } from '@/utils/types/entity-condition.type';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { ProjectEntity } from '../project/infrastructure/persistence/relational/entities/project.entity';
interface TaskUpdate {
  project: ProjectEntity;
  taskCount: number;
}
@Injectable()
export class NotificationsService {
  constructor(private readonly notificationRepository: NotificationRepository,

    
  ) {}

  async sendTaskUpdateNotifications(updates: any) {

    console.log("updates:",updates)
    const batchedMessages = updates.map((u) => ({
      message: `${u.count} tasks updated in ${u.project.project_title}`,
      project: u.project,
    }));

    const notifications =await  this.notificationRepository.save(batchedMessages);


      notifications.forEach((n) => console.log(`[Notification] ${n.message}`));
  }

}
