import { DeepPartial } from '../../../../utils/types/deep-partial.type';
import { EntityCondition } from '../../../../utils/types/entity-condition.type';
import { NullableType } from '../../../../utils/types/nullable.type';
import { Project, ProjectUser } from '../../../../packages/domins';

export abstract class ProjectRepository {

  // abstract createProject(
  //   data: Omit<Project, 'project_id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
  // ): Promise<Project>;



  // abstract createUserProject(
  //   data: Omit<ProjectUser, 'project_user_id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
  // ): Promise<ProjectUser>;

  
  // abstract getProjectById(
  //   projectId: number 
  // ): Promise<Project>;

  // abstract getProjectUser(
  //   projectId: number 
  // ): Promise<ProjectUser>;


  // abstract update(
  //   payload: Partial<
  //     Omit<
  //     Project,
  //       'project_id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  //     >
  //   >
  // ): Promise<Project | null>;


  // abstract delete(project_id?: Project['project_id']): Promise<void>;


  // abstract getAllProj(
  //   organization_id?: Project['organization_id']
  // ): Promise<Project[]>;

  // abstract getInsigit(
  //   organization_id?: Project['organization_id']
  // ): Promise<any>;

  
}
