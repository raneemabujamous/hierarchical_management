import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository ,In} from 'typeorm';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { Task, User ,  } from '../../../../../../packages/domins';
import { TaskRepository } from '../../task.repository';
import { TaskMapper, } from '../mappers/task.mapper';
import { EntityCondition } from '../../../../../../utils/types/entity-condition.type';
import{TaskEntity} from '../entities/task.entity'
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';
import { Role } from '@/modules/user/infrastructure/persistence/relational/entities/role.enum';

@Injectable()
export class TasksRelationalRepository implements TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,

  ) {}

  async findOne(fields: any): Promise<NullableType<TaskEntity>> {
    
    console.log("fields::",fields)
    const entity = await this.taskRepository.findOne({
      where: fields as FindOptionsWhere<TaskEntity>,
    });
    console.log("entity::",entity)
    return plainToInstance(TaskEntity,entity )
  }

  async findTaskByUserAndTaskId(userId: number, taskId: number, role: string): Promise<TaskEntity> {

    console.log("role::",role)
    const query = this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.assignees', 'user')
      .where('task.task_id = :taskId', { taskId });
  
    if (role === Role.EMPLOYEE) {
      query.andWhere('user.user_id = :userId', { userId });
    }
  
    const task = await query.getOne();
  
    if (!task) {
      throw new NotFoundException('Task not found or user not assigned to it');
    }
  
    return task;
  }
  async save (tasks :any[] ){
    await this.taskRepository.save(tasks); 
  }
  async createTask(data: any , project:any): Promise<any> {
  

    const taskEntity = this.taskRepository.create({
      task_title: data.task_title.trim(),
      description:data.description,
      status:data.status,
      project: project,
      assignees: data.assignees.length ? data.assignees : [],

    });
    
    const task = await this.taskRepository.save(taskEntity);
    return task;
    
  }
  async  findByIds(ids: [] ): Promise<  TaskEntity[]> {
    const users = await this.taskRepository.find({
      where: { task_id: In(ids) },
      relations:['project']

    });
return users
  }
  async update(
    dept 
  ): Promise<Task | null> {


    const updatedEntity = TaskMapper.toPersistence({
      ...TaskMapper.toDomain(dept),
    });

    await this.taskRepository.save(updatedEntity);
    return TaskMapper.toDomain(updatedEntity);
  }
}