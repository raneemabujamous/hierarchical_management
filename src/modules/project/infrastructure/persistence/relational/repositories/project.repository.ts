import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { Project, User , ProjectUser } from '../../../../../../packages/domins';
import { ProjectRepository } from '../../project.repository';
import { ProjectMapper, ProjectUserMapper} from '../mappers/project.mapper';
import { EntityCondition } from '../../../../../../utils/types/entity-condition.type';
import{ProjectEntity} from '../entities/project.entity'
import { plainToInstance } from 'class-transformer';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProjectsRelationalRepository implements ProjectRepository {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}


  async findOne(fields: any): Promise<NullableType<ProjectEntity>> {
    console.log("fields::",fields)
    const entity = await this.projectRepository.findOne({
      where: fields as FindOptionsWhere<ProjectEntity>,
    });
    console.log("entity::",entity)
    return plainToInstance(ProjectEntity,entity )
  }
  async createProject(data: any , department:any): Promise<any> {
  

    const projectEntity = this.projectRepository.create({
      project_title: data.project_title.trim(),
      department: department,
    });
    
    const project = await this.projectRepository.save(projectEntity);
    return project;
    
  }







}