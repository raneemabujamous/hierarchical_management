import { DeepPartial } from '../../../../utils/types/deep-partial.type';
import { EntityCondition } from '../../../../utils/types/entity-condition.type';
import { NullableType } from '../../../../utils/types/nullable.type';
import { Project, ProjectUser } from '../../../../packages/domins';

export abstract class ProjectRepository {

  abstract findOne(
    fields:any
  ): Promise<any>;


  abstract createProject(
    data: any , department:any
  ): Promise<any>;

}