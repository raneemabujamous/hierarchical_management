import { DeepPartial } from '../../../../utils/types/deep-partial.type';
import { EntityCondition } from '../../../../utils/types/entity-condition.type';
import { NullableType } from '../../../../utils/types/nullable.type';
import { Task,  } from '../../../../packages/domins';

export abstract class TaskRepository {

  abstract findOne(
    fields:any
  ): Promise<any>;

  abstract findTaskByUserAndTaskId(
      user_id,task_id , role:string
  ): Promise<any>;


  abstract createTask(
    data: any , project:any
  ): Promise<any>;
  abstract update(
    dept: any, 
  ): Promise<Task | null>;

}
