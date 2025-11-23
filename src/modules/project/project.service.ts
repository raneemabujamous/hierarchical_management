import {
  Injectable,
} from '@nestjs/common';
import { ProjectRepository } from './infrastructure/persistence/project.repository';
import { ProjectUser, User } from '../../packages/domins'
import { NullableType } from '@/utils/types/nullable.type';
import { EntityCondition } from '@/utils/types/entity-condition.type';
import {CreateProjectDto,UpdateProjectDto,} from '@/packages/dto/project'
import { Project } from '@/packages/domins';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { DepartmentsService } from '../department/department.service';
import { Role } from '../user/infrastructure/persistence/relational/entities/role.enum';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectRepository: ProjectRepository,

    private readonly departmentsService: DepartmentsService,

  ) {}

  


  async findOne(
    data:any
  ): Promise<any> {
    const where: any = {
      project_id: Number(data.project_id),
    };
  
    if (data.user.role === Role.MANAGER) {
      where.department = {manager :{user_id: data.user.user_id}} ;
    }
    if (data.user.role === Role.EMPLOYEE) {
      throw new NotFoundException('Project not found or access denied');
    }
    console.log("where:::",where)
    const dept = await this.projectRepository.findOne({
      ...where,
    });
  
    if (!dept) {
      throw new NotFoundException('Project not found or access denied');
    }
  
    return dept;
  }
  async createProject(
   user, data 
  ): Promise<Project> {
    
    const department = await this.departmentsService.findOne({department_id: data.department_id , user:{user_id: user.user_id, role:user.role} });
    if (!department) throw new NotFoundException('department not found');
    console.log("department:", department)

   const existing = await this.projectRepository.findOne({
          
            project_title: data.project_title.trim(),
            
            department: { department_id: data.department_id },
  
        });
    
        if (existing) {
          throw new BadRequestException(
            `Project '${data.project_title}' already exists in this department`,
          );
        }
    
        const project = await this.projectRepository.createProject(data,department)
    
    return project;
  }


  
}
