import {
  Injectable,
} from '@nestjs/common';
import { TaskRepository } from './infrastructure/persistence/task.repository';
import { TaskUser, User } from '../../packages/domins'
import { NullableType } from '@/utils/types/nullable.type';
import { EntityCondition } from '@/utils/types/entity-condition.type';
import {CreateTaskDto,UpdateTaskDto,CreateUserTaskDto} from '@/packages/dto/task'
import { Task } from '@/packages/domins';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository,

    
  ) {}

  // async create(
  //   data: Omit<
  //   CreateTaskDto,
  //     'task_id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  //   >
  // ): Promise<Task> {

  //   const task = await this.taskRepository.createTask(data     );
    

  //   return task;
  // }


  // async createUserTask(
  //   data: Omit<
  //   CreateUserTaskDto,
  //     'task_user_id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  //   >
  // ): Promise<TaskUser> {
  //   const taskUser = await this.taskRepository.createUserTask(data);
    

  //   return taskUser;
  // }

  
  // async updateTask(
  //   user_id: number,
  //   payload: Partial<
  //     Omit<Task, 'createdAt' | 'updatedAt' | 'deletedAt'>
  //   >
  // ): Promise<Task | null> {

  //   const task:any = await this.taskRepository.getTaskById(payload.task_id);
  //   if (!task) {
  //     throw new NotFoundException('Task not found');
  //   }

  //   const isMember =
  //   Array.isArray(task.task_users) &&
  //   task.task_users.some(
  //     (pu: any) =>
  //       pu.user_id === user_id ||                // if you keep raw FK columns on join entity
  //       pu.user?.user_id === user_id             // if join entity maps User relation
  //   );

  // if (!isMember) {
  //   throw new ForbiddenException(
  //     "You can't update this task; you're not a member"
  //   );
  // }

    
  //     return this.taskRepository.update(
  //       payload
  //     );
    
  
  
  // }  


  // async delete(task_id: Task['task_id'] , user_id : number ): Promise<void> {
  //   const task:any = await this.taskRepository.getTaskById(task_id);
  //   if (!task) {
  //     throw new NotFoundException('Task not found');
  //   }
  
  //   const isMember =
  //   Array.isArray(task.task_users) &&
  //   task.task_users.some(
  //     (pu: any) =>
  //       pu.user_id === user_id ||               
  //       pu.user?.user_id === user_id             
  //   );

  // if (!isMember) {
  //   throw new ForbiddenException(
  //     "You can't delete this task; you're not a member"
  //   );
  // }

  //   await this.taskRepository.delete(task_id);
  // }

  // getAllProj(organization_id:number): Promise<Task[]> {
  //   return this.taskRepository.getAllProj(organization_id);
  // }

  // getInsigit(organization_id:number): Promise<any> {
  //   return this.taskRepository.getInsigit(organization_id);
  // }

  
}
