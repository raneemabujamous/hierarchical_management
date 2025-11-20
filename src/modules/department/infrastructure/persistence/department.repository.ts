import { DeepPartial } from '../../../../utils/types/deep-partial.type';
import { EntityCondition } from '../../../../utils/types/entity-condition.type';
import { NullableType } from '../../../../utils/types/nullable.type';
import { Department } from '../../../../packages/domins';

export abstract class DepartmentRepository {

  abstract createDepartment(
    data: any
  ): Promise<any>;


  // abstract getAllOrg(
  // ): Promise<Department[]>;


  
}
