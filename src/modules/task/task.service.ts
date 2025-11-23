import {
  Injectable,
} from '@nestjs/common';
import { TaskRepository } from './infrastructure/persistence/task.repository';
import {  User } from '../../packages/domins'
import { NullableType } from '@/utils/types/nullable.type';
import { EntityCondition } from '@/utils/types/entity-condition.type';
import {CreateTaskDto,UpdateTaskDto,CreateUserTaskDto} from '@/packages/dto/task'
import { Task } from '@/packages/domins';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Role } from '../user/infrastructure/persistence/relational/entities/role.enum';
import { ProjectsService } from '../project/project.service';
import { UsersService } from '../user/user.service';
import { ProjectEntity } from '../project/infrastructure/persistence/relational/entities/project.entity';
import { NotificationsService } from '../notification/notification.service';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository,
    private readonly projectsService: ProjectsService,
    private readonly usersService: UsersService,
    private readonly notificationsService: NotificationsService,

    
  ) {}

  async findOne(
    data:any
  ): Promise<any> {
    const where: any = {
      task_id: Number(data.task_id),
    };
  
    if (data.user.role === Role.MANAGER) {
      where.project = {department:{manager :{user_id: data.user.user_id}} };
    }
    if (data.user.role === Role.EMPLOYEE) {
      where.assignees = {user_id: data.user.user_id};

    console.log("where:::",where)
    const task = await this.taskRepository.findOne({
      ...where,
    });
  
    if (!task) {
      throw new NotFoundException('Project not found or access denied to this task');
    }
  
    return task;
  }
  }
  

  async createTask(
    user, data 
   ): Promise<Task> {
     
     const project  = await this.projectsService.findOne({project_id: data.project_id ,user} );
     if (!project) throw new NotFoundException('Project not found or acess denied ');
     console.log("projectExisit:", project)
     
        let assignees: User[] = [];
        if (data.assignee_ids && data.assignee_ids.length > 0) {
          assignees = await this.usersService.findByIds(data.assignee_ids , Role.EMPLOYEE);
          const foundIds = assignees.map((u) => u.user_id);
          const missing = data.assignee_ids.filter((id) => !foundIds.includes(id));
          if (missing.length) {
            throw new BadRequestException(`Assignees not found: ${missing.join(', ')} or not EMPLOYEE`);
          }
        }
    
    

     const task = await this.taskRepository.createTask({
            task_title: data.task_title.trim(),
      description:data.description,
      status:data.status,
      assignees :assignees ,

     },project)
     
     return task;
   }
 async findTaskByUserAndTaskId(user_id: number, task_id: number,role){
  return await this.taskRepository.findTaskByUserAndTaskId(user_id,task_id , role)
 }


 async updateTask(
  task_id, data , user
): Promise<any> {
  const where: any = {
    task_id: Number(data.task_id),
  };

  if (user.role === Role.MANAGER) {
    where.project = {department:{manager :{user_id: user.user_id}} };
  }
  if (user.role === Role.EMPLOYEE) {
    where.assignees = {user_id: user.user_id};

  console.log("where:::",where)
  const task = await this.taskRepository.findOne({
    ...where,
  });

  if (!task) {
    throw new NotFoundException('Project not found or access denied to this task');
  }
}
  
  const updated = await this.taskRepository.update(data);

  return updated;
}

async batchUpdateTasks(taskIds: number[], status: string) {
  if (!taskIds || taskIds.length === 0) return;
  const tasks = await this.taskRepository.findByIds(taskIds);
  tasks.forEach((task) => (task.status = status));
  await this.taskRepository.save(tasks);

  const updatesMap: Map<number, { project: ProjectEntity; count: number }> =
    new Map();

  tasks.forEach((task) => {
    const projId = task.project.project_id;
    if (!updatesMap.has(projId)) {
      updatesMap.set(projId, { project: task.project, count: 0 });
    }
    updatesMap.get(projId).count++;
  });

  const updates = Array.from(updatesMap.values());
  console.log("updates::",updates)
  await this.notificationsService.sendTaskUpdateNotifications(updates);
}

}
