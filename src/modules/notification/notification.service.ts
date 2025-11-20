import {
  Injectable,
} from '@nestjs/common';
import { NotificationRepository } from './infrastructure/persistence/notification.repository';
import { NullableType } from '@/utils/types/nullable.type';
import { EntityCondition } from '@/utils/types/entity-condition.type';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  constructor(private readonly notificationRepository: NotificationRepository,

    
  ) {}

  // async create(
  //   data: Omit<
  //   CreateNotificationDto,
  //     'notification_id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  //   >
  // ): Promise<Notification> {

  //   const notification = await this.notificationRepository.createNotification(data     );
    

  //   return notification;
  // }


  // async createUserNotification(
  //   data: Omit<
  //   CreateUserNotificationDto,
  //     'notification_user_id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  //   >
  // ): Promise<NotificationUser> {
  //   const notificationUser = await this.notificationRepository.createUserNotification(data);
    

  //   return notificationUser;
  // }

  
  // async updateNotification(
  //   user_id: number,
  //   payload: Partial<
  //     Omit<Notification, 'createdAt' | 'updatedAt' | 'deletedAt'>
  //   >
  // ): Promise<Notification | null> {

  //   const notification:any = await this.notificationRepository.getNotificationById(payload.notification_id);
  //   if (!notification) {
  //     throw new NotFoundException('Notification not found');
  //   }

  //   const isMember =
  //   Array.isArray(notification.notification_users) &&
  //   notification.notification_users.some(
  //     (pu: any) =>
  //       pu.user_id === user_id ||                // if you keep raw FK columns on join entity
  //       pu.user?.user_id === user_id             // if join entity maps User relation
  //   );

  // if (!isMember) {
  //   throw new ForbiddenException(
  //     "You can't update this notification; you're not a member"
  //   );
  // }

    
  //     return this.notificationRepository.update(
  //       payload
  //     );
    
  
  
  // }  


  // async delete(notification_id: Notification['notification_id'] , user_id : number ): Promise<void> {
  //   const notification:any = await this.notificationRepository.getNotificationById(notification_id);
  //   if (!notification) {
  //     throw new NotFoundException('Notification not found');
  //   }
  
  //   const isMember =
  //   Array.isArray(notification.notification_users) &&
  //   notification.notification_users.some(
  //     (pu: any) =>
  //       pu.user_id === user_id ||               
  //       pu.user?.user_id === user_id             
  //   );

  // if (!isMember) {
  //   throw new ForbiddenException(
  //     "You can't delete this notification; you're not a member"
  //   );
  // }

  //   await this.notificationRepository.delete(notification_id);
  // }

  // getAllProj(organization_id:number): Promise<Notification[]> {
  //   return this.notificationRepository.getAllProj(organization_id);
  // }

  // getInsigit(organization_id:number): Promise<any> {
  //   return this.notificationRepository.getInsigit(organization_id);
  // }

  
}
