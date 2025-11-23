import {
  Injectable,
} from '@nestjs/common';
import { OrganizationRepository } from './infrastructure/persistence/organization.repository';
import { User } from '../../packages/domins'
import { NullableType } from '@/utils/types/nullable.type';
import { EntityCondition } from '@/utils/types/entity-condition.type';
import {CreateOrganizationDto} from '@/packages/dto/organization'
import { Organization } from '@/packages/domins';
import { OrganizationEntity } from './infrastructure/persistence/relational/entities/organization.entity';

@Injectable()
export class OrganizationsService {
  constructor(private readonly organizationRepository: OrganizationRepository,


    
  ) {}

  
  async create(
    data: Omit<
    CreateOrganizationDto,
    'createdAt' | 'updatedAt' | 'deletedAt'
    >
  ,): Promise<Organization> {
    const organization = await this.organizationRepository.createOrganization(data    );
    

    return organization;
  }
  getOne(organization_id): Promise<any> {
    return this.organizationRepository.getOne(organization_id);
  }
  
  
}
