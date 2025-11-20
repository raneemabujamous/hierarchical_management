import {
  Injectable,
} from '@nestjs/common';
import { ProjectRepository } from './infrastructure/persistence/project.repository';
import { ProjectUser, User } from '../../packages/domins'
import { NullableType } from '@/utils/types/nullable.type';
import { EntityCondition } from '@/utils/types/entity-condition.type';
import {CreateProjectDto,UpdateProjectDto,CreateUserProjectDto} from '@/packages/dto/project'
import { Project } from '@/packages/domins';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectRepository: ProjectRepository,

    
  ) {}

  // async create(
  //   data: Omit<
  //   CreateProjectDto,
  //     'project_id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  //   >
  // ): Promise<Project> {

  //   const project = await this.projectRepository.createProject(data     );
    

  //   return project;
  // }


  // async createUserProject(
  //   data: Omit<
  //   CreateUserProjectDto,
  //     'project_user_id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  //   >
  // ): Promise<ProjectUser> {
  //   const projectUser = await this.projectRepository.createUserProject(data);
    

  //   return projectUser;
  // }

  
  // async updateProject(
  //   user_id: number,
  //   payload: Partial<
  //     Omit<Project, 'createdAt' | 'updatedAt' | 'deletedAt'>
  //   >
  // ): Promise<Project | null> {

  //   const project:any = await this.projectRepository.getProjectById(payload.project_id);
  //   if (!project) {
  //     throw new NotFoundException('Project not found');
  //   }

  //   const isMember =
  //   Array.isArray(project.project_users) &&
  //   project.project_users.some(
  //     (pu: any) =>
  //       pu.user_id === user_id ||                // if you keep raw FK columns on join entity
  //       pu.user?.user_id === user_id             // if join entity maps User relation
  //   );

  // if (!isMember) {
  //   throw new ForbiddenException(
  //     "You can't update this project; you're not a member"
  //   );
  // }

    
  //     return this.projectRepository.update(
  //       payload
  //     );
    
  
  
  // }  


  // async delete(project_id: Project['project_id'] , user_id : number ): Promise<void> {
  //   const project:any = await this.projectRepository.getProjectById(project_id);
  //   if (!project) {
  //     throw new NotFoundException('Project not found');
  //   }
  
  //   const isMember =
  //   Array.isArray(project.project_users) &&
  //   project.project_users.some(
  //     (pu: any) =>
  //       pu.user_id === user_id ||               
  //       pu.user?.user_id === user_id             
  //   );

  // if (!isMember) {
  //   throw new ForbiddenException(
  //     "You can't delete this project; you're not a member"
  //   );
  // }

  //   await this.projectRepository.delete(project_id);
  // }

  // getAllProj(organization_id:number): Promise<Project[]> {
  //   return this.projectRepository.getAllProj(organization_id);
  // }

  // getInsigit(organization_id:number): Promise<any> {
  //   return this.projectRepository.getInsigit(organization_id);
  // }

  
}
