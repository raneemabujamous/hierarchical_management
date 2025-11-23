import { DeepPartial } from '../../../../utils/types/deep-partial.type';
import { EntityCondition } from '../../../../utils/types/entity-condition.type';
import { NullableType } from '../../../../utils/types/nullable.type';
import { Department, Organization } from '../../../../packages/domins';
import type { FindOptionsWhere } from 'typeorm';

export abstract class DepartmentRepository {

  abstract createDepartment(
    data: any
  ): Promise<any>;


  // abstract getAllOrg(
  // ): Promise<Department[]>;

  abstract findOne(
    fields:any
  ): Promise<any>;

  abstract update(
    dept: any, 
    payload: Partial<Omit<Department, 'createdAt' | 'updatedAt' | 'deletedAt'>>
  ): Promise<Department | null>;

} 
