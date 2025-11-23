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
import { TasksService } from './task.service';
import { ApiBearerAuth, ApiTags, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../user/user.decorator';
import { JwtPayloadType } from '../auth/strategies/types/jwt-payload.type';
import { Task,  } from '@/packages/domins';
import {CreateTaskDto,UpdateTaskDto,CreateUserTaskDto} from '@/packages/dto/task'
import { RolesGuard ,Roles} from '../user/role.guard';
import { Role } from '../user/infrastructure/persistence/relational/entities/role.enum';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'),RolesGuard)
@Controller({
  path: 'task',
  version: '1',
})
export class TasksController {
  constructor(private readonly taskService: TasksService) {}


  @Get(':task_id')
  @ApiParam({
    name: 'task_id',
    type: Number,
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  async get(
    @AuthUser() jwtPayload: JwtPayloadType,
    @Param('task_id') task_id: number,
  ): Promise<Task> {
    let data = await this.taskService.findTaskByUserAndTaskId(jwtPayload.user_id , task_id , jwtPayload.role);
    return data;
  }



  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.ADMIN, Role.MANAGER) 
  createOne(
    @AuthUser() jwtPayload: JwtPayloadType,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.createTask(jwtPayload , createTaskDto);
  }

  @Patch(':task_id')
  @ApiParam({
    name: 'task_id',
    type: Number,
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  async update(
    @AuthUser() jwtPayload: JwtPayloadType,
    @Param('task_id') task_id: number,
    @Body() dto: UpdateTaskDto
  ) {
    return this.taskService.updateTask(task_id , dto, jwtPayload);
  }

}


