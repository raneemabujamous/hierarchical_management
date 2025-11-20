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
} from '@nestjs/common';
import { DepartmentsService } from './department.service';
import { ApiBearerAuth, ApiTags, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../user/user.decorator';
import { JwtPayloadType } from '../auth/strategies/types/jwt-payload.type';
import {CreateDepartmentDto} from '@/packages/dto/department'
import { Department } from '@/packages/domins';


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Departments')
@Controller({
  path: 'department',
  version: '1',
})
export class DepartmentsController {
  constructor(private readonly departmentService: DepartmentsService) {}


  @Post()
  @HttpCode(HttpStatus.CREATED)
  createOne(
    @AuthUser() jwtPayload: JwtPayloadType,
    @Body() createDepartmentDto: CreateDepartmentDto,
    
  ): Promise<Department> {
    return this.departmentService.createDepartment(createDepartmentDto);
  }



  // @Get('all')
  // @HttpCode(HttpStatus.OK)
  // async getAllOrg(
  // ): Promise<Department[]> {
  //   let data = await this.departmentService.getAllOrg();
  //   return data;
  // }

}


