import { DeepPartial } from '../../../../utils/types/deep-partial.type';
import { EntityCondition } from '../../../../utils/types/entity-condition.type';
import { NullableType } from '../../../../utils/types/nullable.type';

export abstract class NotificationRepository {

  // abstract createNotification(
  //   data: Omit<Notification, 'notification_id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
  // ): Promise<Notification>;



  // abstract createUserNotification(
  //   data: Omit<NotificationUser, 'notification_user_id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
  // ): Promise<NotificationUser>;

  
  // abstract getNotificationById(
  //   notificationId: number 
  // ): Promise<Notification>;

  // abstract getNotificationUser(
  //   notificationId: number 
  // ): Promise<NotificationUser>;


  // abstract update(
  //   payload: Partial<
  //     Omit<
  //     Notification,
  //       'notification_id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  //     >
  //   >
  // ): Promise<Notification | null>;


  // abstract delete(notification_id?: Notification['notification_id']): Promise<void>;


  // abstract getAllProj(
  //   organization_id?: Notification['organization_id']
  // ): Promise<Notification[]>;

  // abstract getInsigit(
  //   organization_id?: Notification['organization_id']
  // ): Promise<any>;

  
}
