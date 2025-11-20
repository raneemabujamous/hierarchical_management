import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { Department, User } from '../../../../../../packages/domins';
import { DepartmentRepository } from '../../department.repository';
import { DepartmentMapper} from '../mappers/department.mapper';
import { EntityCondition } from '../../../../../../utils/types/entity-condition.type';
import{DepartmentEntity} from '../entities/department.entity'
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


  // async getDepartmentById(departmentId: number): Promise<Department> {
  //   const entity = await this.departmentRepository.findOneBy({ department_id: departmentId });
  //   if (!entity) throw new Error('Department not found');
  //   return DepartmentMapper.toDomain(entity);
  // }




}