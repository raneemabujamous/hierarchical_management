import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { Task, User , TaskUser } from '../../../../../../packages/domins';
import { TaskRepository } from '../../task.repository';
import { TaskMapper, } from '../mappers/task.mapper';
import { EntityCondition } from '../../../../../../utils/types/entity-condition.type';
import{TaskEntity} from '../entities/task.entity'
@Injectable()
export class TasksRelationalRepository implements TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,

  ) {}

  // async createTask(data: Task): Promise<Task> {

  //   console.log("data::",data)
  //   const persistenceModel = TaskMapper.toPersistence(data); // TaskEntity
  //   const newEntity = await this.taskRepository.save(
  //     this.taskRepository.create(persistenceModel)
  //   );
  //   return TaskMapper.toDomain(newEntity); // returns Task
  
  // }

  // // async createUserTask(data: TaskUser): Promise<TaskUser> {

  // //   const existing = await this.taskUserRepo.findOne({
  // //     where: {
  // //       user: { user_id: data.user_id },
  // //       task: { task_id: data.task_id },
  // //     },
  // //   });
  // //   if (existing) {
  // //     return TaskUserMapper.toDomain(existing);
  // //   }

  // //   const persistenceModel = TaskUserMapper.toPersistence(data); // TaskEntity
  // //   const newEntity = await this.taskUserRepo.save(
  // //     this.taskUserRepo.create(persistenceModel)
  // //   );
  // //   return TaskUserMapper.toDomain(newEntity); // returns Task
  
  // // }

  // async getTaskById(taskId: number): Promise<any> {
  //   return this.taskRepository.findOne({
  //     where: { task_id:  taskId },    // nested filter via relation
  //     relations: ['task_users' , 'task_users.user']  ,                // include owner
  //   });
  // }

  
  // // async getTaskUser(taskId: number): Promise<TaskUser> {
  // //   const entity = await this.taskUserRepo.findOneBy({ task_id: taskId });
  // //   if (!entity) throw new Error('Task not found');
  // //   return entity
  // // } 


  // async update(
  //   payload: Partial<
  //     Omit<Task, 'createdAt' | 'updatedAt' | 'deletedAt'>
  //   >
  // ): Promise<Task | null> {
  //   console.log("payload:::",payload)
  //   const entity = await this.taskRepository.findOne({
  //     where: { task_id: Number(payload.task_id) },
  //   });
  //   if (!entity) {
  //     throw new Error('Session not found');
  //   }

  //   const updatedEntity = await this.taskRepository.save(
  //     this.taskRepository.create(
  //       TaskMapper.toPersistence({
  //         ...TaskMapper.toDomain(entity),
  //         ...payload,
  //       })
  //     )
  //   );

  //   return TaskMapper.toDomain(updatedEntity);

  // }
  // async delete(task_id: Task['task_id']): Promise<void> {
  //   await this.taskRepository
  //     .createQueryBuilder()
  //     .delete()
  //     .from(TaskEntity)
  //     .where('task_id = :task_id', { task_id })
  //     .execute();
  // }


  // // async getAllProj(organization_id:number): Promise<Task[]> {
  // //   return this.taskRepository.find({
  // //     where: { organization: { organization_id: organization_id } },    // nested filter via relation
  // //     relations: ['task_users' ,'task_users.user' ]  ,                // include owner
  // //   });
  // // }




}