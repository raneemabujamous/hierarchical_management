import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Put,
  Get,
  Query,
  UseGuards,
  HttpStatus,
  HttpCode,Delete
} from '@nestjs/common';
import { ProjectsService } from './project.service';
import { ApiBearerAuth, ApiTags, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../user/user.decorator';
import { JwtPayloadType } from '../auth/strategies/types/jwt-payload.type';
import { Project, ProjectUser } from '@/packages/domins';
import {CreateProjectDto,} from '@/packages/dto/project'

import { RolesGuard ,Roles} from '../user/role.guard';
import { Role } from '../user/infrastructure/persistence/relational/entities/role.enum';


@ApiTags('Projects')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'),RolesGuard)
@Controller({
  path: 'project',
  version: '1',
})
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}




  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.ADMIN, Role.MANAGER) 
  createOne(
    @AuthUser() jwtPayload: JwtPayloadType,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    return this.projectService.createProject(jwtPayload , createProjectDto);
  }


  @Get(':project_id')
  @ApiParam({
    name: 'project_id',
    type: Number,
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN , Role.MANAGER)  
  async get(
    @AuthUser() jwtPayload: JwtPayloadType,
    @Param('project_id') project_id: number,
  ): Promise<Project> {
    let data = await this.projectService.findOne({project_id:project_id, user:jwtPayload});
    return data;
  }



}
