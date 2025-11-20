import {
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from '../../packages/dto/user';
import { UserRepository } from './infrastructure/persistence/user.repository';
import { User } from '../../packages/domins'
import { NullableType } from '@/utils/types/nullable.type';
import { EntityCondition } from '@/utils/types/entity-condition.type';
import { Role } from './infrastructure/persistence/relational/entities/role.enum';
import { UserEntity } from './infrastructure/persistence/relational/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  async create(createProfileDto: CreateUserDto): Promise<User> {
    const clonedPayload = {
      provider: createProfileDto.email,
      ...createProfileDto,
    };
    if (clonedPayload.password) {
      clonedPayload.password = clonedPayload.password
    }

    if (clonedPayload.email) {
      const userObject = await this.usersRepository.findOne({
        email: clonedPayload.email,
      });
      if (userObject) {

        return  userObject
      }
    }

    return this.usersRepository.create(clonedPayload);
  }
  findOne(fields: EntityCondition<User>): Promise<NullableType<UserEntity>> {
    return this.usersRepository.findOne(fields);
  }


  async isAdmin(userId: number) {
    const u = await this.usersRepository.findOne( {user_id: userId});
    return u?.role === Role.ADMIN;
    }
    
    
    // // Check if user is manager of a department
    // async isManagerOfDepartment(userId: string, departmentId: string) {
    // const dept = await this.deptRepo.findOne({ where: { id: departmentId }, relations: ['manager'] });
    // return dept?.manager?.id === userId;
    // }
    
    
    // // For checking access to a project: manager of department or admin
    // async canManageProject(userId: string, projectId: string) {
    // const project = await this.deptRepo.manager.getRepository(Project).findOne({ where: { id: projectId }, relations: ['department', 'department.manager'] });
    // if (!project) return false;
    // if ((await this.isAdmin(userId))) return true;
    // return project.department.manager?.id === userId;
    // }
    
    
    // // Employee access: assigned to task or higher privilege
    // async canEditTask(userId: string, taskId: string) {
    // if (await this.isAdmin(userId)) return true;
    
    
    // const task = await this.taskRepo.findOne({ where: { id: taskId }, relations: ['assignees', 'project', 'project.department', 'project.department.manager'] });
    // if (!task) return false;
    
    
    // // manager of the department
    // if (task.project.department.manager?.id === userId) return true;
    
    
    // // assigned employee
    // if (task.assignees.some((a) => a.id === userId)) return true;
    
    
    // return false;
    // }

  
}
