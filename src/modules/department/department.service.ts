import { DepartmentRepository } from './infrastructure/persistence/department.repository';
import { User } from '../../packages/domins'
import { NullableType } from '@/utils/types/nullable.type';
import { EntityCondition } from '@/utils/types/entity-condition.type';
import { CreateDepartmentDto } from '@/packages/dto/department'
import { Department } from '@/packages/domins';
import { UsersService } from '../user/user.service';
import { OrganizationsService } from '../organization/organization.service';
import { ProjectsService } from '../project/project.service';
import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { Role } from '../user/infrastructure/persistence/relational/entities/role.enum';

@Injectable()
export class DepartmentsService {
  constructor(private readonly departmentRepository: DepartmentRepository,
    private readonly usersService: UsersService,
    private readonly organizationsService: OrganizationsService,




  ) { }


  async createDepartment(
    data: Omit<
      CreateDepartmentDto,
      'createdAt' | 'updatedAt' | 'deletedAt'
    >
    ,): Promise<Department> {
    const org = await this.organizationsService.getOne(data.organization_id);
    if (!org) throw new NotFoundException('Organization not found');
    console.log("org:", org)

    let manager: User | null = null;
    if (data.manger_id) {
      manager = await this.usersService.findOne({ user_id: data.manger_id  });
      console.log("manager:",manager)
      if (!manager) throw new NotFoundException('Manager not found');

      if (manager.role !== Role.MANAGER) {
        throw new BadRequestException(`User is not a manager. Current role: ${manager.role}`);
      }
    }

    console.log("manager:", manager)

    const existing = await this.departmentRepository.findOne(
      { department_title: data.department_title, organization: { organization_id: data.organization_id } },
    );

    if (existing) {
      throw new BadRequestException('Departemnt Exisit');
    }

    const dept = this.departmentRepository.createDepartment({
      department_title: data.department_title,
      organization: org,
      manager: manager ?? null,
    });

    return dept;
  }



  async findOne(
    data:any
  ): Promise<any> {
    const where: any = {
      department_id: Number(data.department_id),
    };
  
    if (data.user.role === Role.MANAGER) {
      where.manager = {user_id: data.user.user_id} ;
    }
    if (data.user.role === Role.EMPLOYEE) {
      where.manager = {user_id: data.user.user_id} ;
    }
    const dept = await this.departmentRepository.findOne({
      ...where,
    });
  
    if (!dept) {
      throw new NotFoundException('Department not found or access denied');
    }
  
    return dept;
  }
  

  async updateDepartment(
    department_id, data , user
  ): Promise<any> {
    const where: any = {
      department_id: Number(department_id),
    };
  
    if (user.role === Role.MANAGER) {
      where.manager = {user_id: user.user_id} ;
    }
    const dept = await this.departmentRepository.findOne({
      ...where,
    });
  
    if (!dept) {
      throw new NotFoundException('Department not found or access denied');
    }
    
    const updated = await this.departmentRepository.update(dept,data);

    return updated;
  }
}
