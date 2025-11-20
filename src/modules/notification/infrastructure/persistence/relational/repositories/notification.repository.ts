import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { NotificationRepository } from '../../notification.repository';
import { EntityCondition } from '../../../../../../utils/types/entity-condition.type';
import{NotificationEntity} from '../entities/notification.entity'
@Injectable()
export class NotificationsRelationalRepository implements NotificationRepository {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,

  ) {}

  // async createNotification(data: Notification): Promise<Notification> {

  //   console.log("data::",data)
  //   const persistenceModel = NotificationMapper.toPersistence(data); // NotificationEntity
  //   const newEntity = await this.notificationRepository.save(
  //     this.notificationRepository.create(persistenceModel)
  //   );
  //   return NotificationMapper.toDomain(newEntity); // returns Notification
  
  // }

  // // async createUserNotification(data: NotificationUser): Promise<NotificationUser> {

  // //   const existing = await this.notificationUserRepo.findOne({
  // //     where: {
  // //       user: { user_id: data.user_id },
  // //       notification: { notification_id: data.notification_id },
  // //     },
  // //   });
  // //   if (existing) {
  // //     return NotificationUserMapper.toDomain(existing);
  // //   }

  // //   const persistenceModel = NotificationUserMapper.toPersistence(data); // NotificationEntity
  // //   const newEntity = await this.notificationUserRepo.save(
  // //     this.notificationUserRepo.create(persistenceModel)
  // //   );
  // //   return NotificationUserMapper.toDomain(newEntity); // returns Notification
  
  // // }

  // async getNotificationById(notificationId: number): Promise<any> {
  //   return this.notificationRepository.findOne({
  //     where: { notification_id:  notificationId },    // nested filter via relation
  //     relations: ['notification_users' , 'notification_users.user']  ,                // include owner
  //   });
  // }

  
  // // async getNotificationUser(notificationId: number): Promise<NotificationUser> {
  // //   const entity = await this.notificationUserRepo.findOneBy({ notification_id: notificationId });
  // //   if (!entity) throw new Error('Notification not found');
  // //   return entity
  // // } 


  // async update(
  //   payload: Partial<
  //     Omit<Notification, 'createdAt' | 'updatedAt' | 'deletedAt'>
  //   >
  // ): Promise<Notification | null> {
  //   console.log("payload:::",payload)
  //   const entity = await this.notificationRepository.findOne({
  //     where: { notification_id: Number(payload.notification_id) },
  //   });
  //   if (!entity) {
  //     throw new Error('Session not found');
  //   }

  //   const updatedEntity = await this.notificationRepository.save(
  //     this.notificationRepository.create(
  //       NotificationMapper.toPersistence({
  //         ...NotificationMapper.toDomain(entity),
  //         ...payload,
  //       })
  //     )
  //   );

  //   return NotificationMapper.toDomain(updatedEntity);

  // }
  // async delete(notification_id: Notification['notification_id']): Promise<void> {
  //   await this.notificationRepository
  //     .createQueryBuilder()
  //     .delete()
  //     .from(NotificationEntity)
  //     .where('notification_id = :notification_id', { notification_id })
  //     .execute();
  // }


  // // async getAllProj(organization_id:number): Promise<Notification[]> {
  // //   return this.notificationRepository.find({
  // //     where: { organization: { organization_id: organization_id } },    // nested filter via relation
  // //     relations: ['notification_users' ,'notification_users.user' ]  ,                // include owner
  // //   });
  // // }




}