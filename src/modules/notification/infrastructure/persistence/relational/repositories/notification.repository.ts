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


  async save(data: any ): Promise<any> {
  

    const notificationEntity = this.notificationRepository.create(data);
    
    const notification = await this.notificationRepository.save(notificationEntity);
    return notification;
    
  }


}