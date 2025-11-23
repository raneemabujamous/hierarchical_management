import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Get,
  Query,
  UseGuards,
  HttpStatus,
  HttpCode,
  Patch
} from '@nestjs/common';
import { DepartmentsService } from './department.service';
import { ApiBearerAuth, ApiTags, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../user/user.decorator';
import { JwtPayloadType } from '../auth/strategies/types/jwt-payload.type';
import {CreateDepartmentDto,UpdateDepartmentDto} from '@/packages/dto/department'
import { Department } from '@/packages/domins';
import { RolesGuard ,Roles} from '../user/role.guard';
import { Role } from '../user/infrastructure/persistence/relational/entities/role.enum';
import { DepartmentEntity } from './infrastructure/persistence/relational/entities/department.entity';


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'),RolesGuard)
@ApiTags('Departments')
@Controller({
  path: 'department',
  version: '1',
})
export class DepartmentsController {
  constructor(private readonly departmentService: DepartmentsService) {}


  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.ADMIN) 
  createOne(
    @AuthUser() jwtPayload: JwtPayloadType,
    @Body() createDepartmentDto: CreateDepartmentDto,
    
  ): Promise<Department> {
    return this.departmentService.createDepartment(createDepartmentDto);
  }


  @Get(':department_id')
  @ApiParam({
    name: 'department_id',
    type: Number,
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN , Role.MANAGER)  
  async get(
    @AuthUser() jwtPayload: JwtPayloadType,
    @Param('department_id') department_id: number,
  ): Promise<Department> {
    let data = await this.departmentService.findOne({department_id:department_id, user:jwtPayload});
    return data;
  }



  @Patch(':department_id')
  @ApiParam({
    name: 'department_id',
    type: Number,
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN , Role.MANAGER)  
  async update(
    @AuthUser() jwtPayload: JwtPayloadType,
    @Param('department_id') department_id: number,
    @Body() dto: UpdateDepartmentDto
  ) {
    return this.departmentService.updateDepartment(department_id , dto, jwtPayload);
  }

}


