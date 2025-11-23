import { DeepPartial } from '../../../../utils/types/deep-partial.type';
import { EntityCondition } from '../../../../utils/types/entity-condition.type';
import { NullableType } from '../../../../utils/types/nullable.type';

export abstract class NotificationRepository {
  
  abstract save(
    notification:any
  ): Promise<any[]>;

}
