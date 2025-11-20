import { DepartmentRepository } from './infrastructure/persistence/department.repository';
import { User } from '../../packages/domins'
import { NullableType } from '@/utils/types/nullable.type';
import { EntityCondition } from '@/utils/types/entity-condition.type';
import {CreateDepartmentDto} from '@/packages/dto/department'
import { Department } from '@/packages/domins';
import { UsersService } from '../user/user.service';
import { OrganizationsService } from '../organization/organization.service';
import { ProjectsService } from '../project/project.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DepartmentsService {
  constructor(private readonly departmentRepository: DepartmentRepository,
    private readonly usersService: UsersService,
    private readonly organizationsService: OrganizationsService,
    private readonly projectsService: ProjectsService



    
  ) {}

  
  async createDepartment(
    data: Omit<
    CreateDepartmentDto,
    'createdAt' | 'updatedAt' | 'deletedAt'
    >
  ,): Promise<Department> {
    const org = await this.organizationsService.getOne(data.organization_id);
    if (!org) throw new NotFoundException('Organization not found');
    console.log("org:",org)

    // 2. Optionally find manager
    let manager: User | null = null;
    if (data.manger_id) {
      manager = await this.usersService.findOne( { user_id: data.manger_id });
      if (!manager) throw new NotFoundException('Manager not found');
    }

    console.log("manager:",manager)
    // 3. Create department
    const dept = this.departmentRepository.createDepartment({
      department_title: data.department_title,
      organization: org,
      manager: manager ?? null,
    });

    return dept;
  }


  //   return this.departmentRepository.getAllOrg();
  // }

  
  
}
