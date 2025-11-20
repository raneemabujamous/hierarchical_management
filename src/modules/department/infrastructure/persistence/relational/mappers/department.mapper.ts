import { Department } from '@/packages/domins';
import { DepartmentEntity } from '../entities/department.entity';

export class DepartmentMapper {
  static toDomain(entity: DepartmentEntity): Department {
    const department = new Department();
    department.department_id = entity.department_id;
    department.department_title = entity.department_title;
    department.createdAt = entity.createdAt;
    department.updatedAt = entity.updatedAt;
    return department;
  }

  static toPersistence(department: Department): DepartmentEntity {
    const entity = new DepartmentEntity();
    entity.department_id = department.department_id;
    entity.department_title = department.department_title;
    entity.createdAt = department.createdAt;
    entity.updatedAt = department.updatedAt;

    
    return entity;
  }
}
