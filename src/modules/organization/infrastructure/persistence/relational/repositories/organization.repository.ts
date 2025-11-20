import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { Organization, User } from '../../../../../../packages/domins';
import { OrganizationRepository } from '../../organization.repository';
import { OrganizationMapper} from '../mappers/organization.mapper';
import { EntityCondition } from '../../../../../../utils/types/entity-condition.type';
import{OrganizationEntity} from '../entities/organization.entity'
import { plainToInstance } from 'class-transformer';

@Injectable()
export class OrganizationsRelationalRepository implements OrganizationRepository {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly organizationRepository: Repository<OrganizationEntity>


  ) {}

  async createOrganization(data: Organization): Promise<Organization> {
    const persistenceModel = OrganizationMapper.toPersistence(data); // OrganizationEntity
    const newEntity = await this.organizationRepository.save(
      this.organizationRepository.create(persistenceModel)
    );
    return OrganizationMapper.toDomain(newEntity); // returns Organization
  
  }


  // async getOrganizationById(organizationId: number): Promise<Organization> {
  //   const entity = await this.organizationRepository.findOneBy({ organization_id: organizationId });
  //   if (!entity) throw new Error('Organization not found');
  //   return OrganizationMapper.toDomain(entity);
  // }

  async getOne(organization_id:number): Promise<any> {
  const  entity =  this.organizationRepository.findOne({where:{organization_id:organization_id}});

    return entity
  }


}