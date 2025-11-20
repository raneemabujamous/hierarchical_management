import { DeepPartial } from '../../../../utils/types/deep-partial.type';
import { EntityCondition } from '../../../../utils/types/entity-condition.type';
import { NullableType } from '../../../../utils/types/nullable.type';
import { Organization } from '../../../../packages/domins';
import { OrganizationEntity } from './relational/entities/organization.entity';

export abstract class OrganizationRepository {

  abstract createOrganization(
    data: Omit<Organization, 'organization_id'|'createdAt' | 'deletedAt' | 'updatedAt'>
  ): Promise<Organization>;


  abstract getOne(organization_id:number
  ): Promise<any>;


  
}
