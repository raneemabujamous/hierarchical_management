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
import {CreateProjectDto,UpdateProjectDto,CreateUserProjectDto} from '@/packages/dto/project'
@ApiTags('Projects')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'project',
  version: '1',
})
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}


  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // createOne(
  //   @AuthUser() jwtPayload: JwtPayloadType,
  //   @Body() createProjectDto: CreateProjectDto,
    
  // ): Promise<Project> {
  //   return this.projectService.create(createProjectDto);
  // }

  // @Post('add-user')
  // @HttpCode(HttpStatus.CREATED)
  // createProjectUser(
  //   @AuthUser() jwtPayload: JwtPayloadType,
  //   @Body() createUserProjectDto: CreateUserProjectDto,
    
  // ): Promise<ProjectUser> {
  //   return this.projectService.createUserProject(createUserProjectDto);
  // }

  // @Patch()
  // @HttpCode(HttpStatus.OK)
  // update(
  //   @Body() updateProjectDto: any,
  //   @AuthUser() jwtPayload: JwtPayloadType
  // ): Promise<Project | null> {
  //   return this.projectService.updateProject(
  //     jwtPayload.user_id,
  //    updateProjectDto
  //   );
  // }


  // @Delete(':project_id')
  // @ApiParam({
  //   name: 'project_id',
  //   type: Number,
  //   required: true,
  // })
  // @HttpCode(HttpStatus.NO_CONTENT)
  // remove(
  //   @Param('project_id') project_id: Project['project_id'],
  //   @AuthUser() jwtPayload: JwtPayloadType

  // ): Promise<void> {
  //   return this.projectService.delete(project_id,jwtPayload.user_id,);
  // }



  // @Get(':organization_id')
  // @ApiParam({
  //   name: 'organization_id',
  //   type: Number,
  //   required: true,
  // })
  // @HttpCode(HttpStatus.OK)
  // async getAllProj(
  //   @Param('organization_id') organization_id: Project['organization_id'],

  // ): Promise<Project[]> {
  //   let data = await this.projectService.getAllProj(organization_id);
  //   return data;
  // }


  // @Get('insight/:organization_id')
  // @ApiParam({
  //   name: 'organization_id',
  //   type: Number,
  //   required: true,
  // })
  // @HttpCode(HttpStatus.OK)
  // async getInsigit(
  //   @Param('organization_id') organization_id: Project['organization_id'],

  // ): Promise<Project[]> {
  //   let data = await this.projectService.getInsigit(organization_id);
  //   return data;
  // }
}
