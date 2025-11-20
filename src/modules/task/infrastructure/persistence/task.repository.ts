import { DeepPartial } from '../../../../utils/types/deep-partial.type';
import { EntityCondition } from '../../../../utils/types/entity-condition.type';
import { NullableType } from '../../../../utils/types/nullable.type';
import { Task, TaskUser } from '../../../../packages/domins';

export abstract class TaskRepository {

  // abstract createTask(
  //   data: Omit<Task, 'task_id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
  // ): Promise<Task>;



  // abstract createUserTask(
  //   data: Omit<TaskUser, 'task_user_id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
  // ): Promise<TaskUser>;

  
  // abstract getTaskById(
  //   taskId: number 
  // ): Promise<Task>;

  // abstract getTaskUser(
  //   taskId: number 
  // ): Promise<TaskUser>;


  // abstract update(
  //   payload: Partial<
  //     Omit<
  //     Task,
  //       'task_id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  //     >
  //   >
  // ): Promise<Task | null>;


  // abstract delete(task_id?: Task['task_id']): Promise<void>;


  // abstract getAllProj(
  //   organization_id?: Task['organization_id']
  // ): Promise<Task[]>;

  // abstract getInsigit(
  //   organization_id?: Task['organization_id']
  // ): Promise<any>;

  
}
