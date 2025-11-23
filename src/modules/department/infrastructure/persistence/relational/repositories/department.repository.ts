import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { Department, User } from '../../../../../../packages/domins';
import { DepartmentRepository } from '../../department.repository';
import { DepartmentMapper} from '../mappers/department.mapper';
import { EntityCondition } from '../../../../../../utils/types/entity-condition.type';
import{DepartmentEntity} from '../entities/department.entity'
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DepartmentsRelationalRepository implements DepartmentRepository {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>


  ) {}

  async createDepartment(data: any): Promise<any> {
    const newEntity = await this.departmentRepository.save(
      this.departmentRepository.create(data)
    );
    return newEntity 
  
  }


 
  async findOne(fields: any): Promise<NullableType<DepartmentEntity>> {
    console.log("fields::",fields)
    const entity = await this.departmentRepository.findOne({
      where: fields as FindOptionsWhere<DepartmentEntity>,
    });
    console.log("entity::",entity)
    return plainToInstance(DepartmentEntity,entity )
  }

  async update(
    dept ,     payload
  ): Promise<Department | null> {


    const updatedEntity = DepartmentMapper.toPersistence({
      ...DepartmentMapper.toDomain(dept),
      ...payload,
    });

    await this.departmentRepository.save(updatedEntity);
    return DepartmentMapper.toDomain(updatedEntity);
  }



}