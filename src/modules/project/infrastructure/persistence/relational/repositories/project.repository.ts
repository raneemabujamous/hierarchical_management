import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { Project, User , ProjectUser } from '../../../../../../packages/domins';
import { ProjectRepository } from '../../project.repository';
import { ProjectMapper, ProjectUserMapper} from '../mappers/project.mapper';
import { EntityCondition } from '../../../../../../utils/types/entity-condition.type';
import{ProjectEntity} from '../entities/project.entity'
import { plainToInstance } from 'class-transformer';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProjectsRelationalRepository implements ProjectRepository {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}


  async findOne(fields: any): Promise<NullableType<ProjectEntity>> {
    console.log("fields::",fields)
    const entity = await this.projectRepository.findOne({
      where: fields as FindOptionsWhere<ProjectEntity>,
    });
    console.log("entity::",entity)
    return plainToInstance(ProjectEntity,entity )
  }
  async createProject(data: any , department:any): Promise<any> {
  

    const projectEntity = this.projectRepository.create({
      project_title: data.project_title.trim(),
      department: department,
    });
    
    const project = await this.projectRepository.save(projectEntity);
    return project;
    
  }






//   async createUserProject(data: ProjectUser): Promise<ProjectUser> {

//     const existing = await this.projectUserRepo.findOne({
//       where: {
//         user: { user_id: data.user_id },
//         project: { project_id: data.project_id },
//       },
//     });
//     if (existing) {
//       return ProjectUserMapper.toDomain(existing);
//     }

//     const persistenceModel = ProjectUserMapper.toPersistence(data); // ProjectEntity
//     const newEntity = await this.projectUserRepo.save(
//       this.projectUserRepo.create(persistenceModel)
//     );
//     return ProjectUserMapper.toDomain(newEntity); // returns Project
  
//   }

//   async getProjectById(projectId: number): Promise<any> {
//     return this.projectRepository.findOne({
//       where: { project_id:  projectId },    // nested filter via relation
//       relations: ['project_users' , 'project_users.user']  ,                // include owner
//     });
//   }

  
//   async getProjectUser(projectId: number): Promise<ProjectUser> {
//     const entity = await this.projectUserRepo.findOneBy({ project_id: projectId });
//     if (!entity) throw new Error('Project not found');
//     return entity
//   } 


//   async update(
//     payload: Partial<
//       Omit<Project, 'createdAt' | 'updatedAt' | 'deletedAt'>
//     >
//   ): Promise<Project | null> {
//     console.log("payload:::",payload)
//     const entity = await this.projectRepository.findOne({
//       where: { project_id: Number(payload.project_id) },
//     });
//     if (!entity) {
//       throw new Error('Session not found');
//     }

//     const updatedEntity = await this.projectRepository.save(
//       this.projectRepository.create(
//         ProjectMapper.toPersistence({
//           ...ProjectMapper.toDomain(entity),
//           ...payload,
//         })
//       )
//     );

//     return ProjectMapper.toDomain(updatedEntity);

//   }
//   async delete(project_id: Project['project_id']): Promise<void> {
//     await this.projectRepository
//       .createQueryBuilder()
//       .delete()
//       .from(ProjectEntity)
//       .where('project_id = :project_id', { project_id })
//       .execute();
//   }


//   async getAllProj(organization_id:number): Promise<Project[]> {
//     return this.projectRepository.find({
//       where: { organization: { organization_id: organization_id } },    // nested filter via relation
//       relations: ['project_users' ,'project_users.user' ]  ,                // include owner
//     });
//   }


//   async getInsigit(organization_id: number): Promise<any> {
//     const projects = await this.projectRepository.find({
//       where: { organization: { organization_id } }, // nested filter via relation
//       relations: ['project_users', 'project_users.user'], // include users
//     });
  
//     const active_projects = projects.filter(p => p.status === 'active');
//     const completed_projects = projects.filter(p => p.status === 'completed');
  
//     return {
//       total_project: projects.length,
//       active_project: active_projects,        // use .length if you want counts instead
//       completed_project: completed_projects,  // use .length if you want counts instead
//       project_per_user: {
//         x_label: 'project_name',
//         y_label: 'number_of_users',
//         labels: projects.map(p => p.project_title),
//         values: projects.map(p => p.project_users?.length ?? 0),
//       },
//     };
  
// }

}