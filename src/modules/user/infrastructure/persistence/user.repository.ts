import { DeepPartial } from '../../../../utils/types/deep-partial.type';
import { EntityCondition } from '../../../../utils/types/entity-condition.type';
import { NullableType } from '../../../../utils/types/nullable.type';
import { User } from '../../../../packages/domins';
import { UserEntity } from './relational/entities/user.entity';
export abstract class UserRepository {
  abstract create(
    data: Omit<User, 'user_id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
  ): Promise<User>;



  abstract findOne(fields: EntityCondition<User>): Promise<UserEntity>;

}
