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
import { Task, TaskUser } from '@/packages/domins';
import {CreateTaskDto,UpdateTaskDto,CreateUserTaskDto} from '@/packages/dto/task'
@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'task',
  version: '1',
})
export class TasksController {
  constructor(private readonly taskService: TasksService) {}


  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // createOne(
  //   @AuthUser() jwtPayload: JwtPayloadType,
  //   @Body() createTaskDto: CreateTaskDto,
    
  // ): Promise<Task> {
  //   return this.taskService.create(createTaskDto);
  // }

  // @Post('add-user')
  // @HttpCode(HttpStatus.CREATED)
  // createTaskUser(
  //   @AuthUser() jwtPayload: JwtPayloadType,
  //   @Body() createUserTaskDto: CreateUserTaskDto,
    
  // ): Promise<TaskUser> {
  //   return this.taskService.createUserTask(createUserTaskDto);
  // }

  // @Patch()
  // @HttpCode(HttpStatus.OK)
  // update(
  //   @Body() updateTaskDto: any,
  //   @AuthUser() jwtPayload: JwtPayloadType
  // ): Promise<Task | null> {
  //   return this.taskService.updateTask(
  //     jwtPayload.user_id,
  //    updateTaskDto
  //   );
  // }


  // @Delete(':task_id')
  // @ApiParam({
  //   name: 'task_id',
  //   type: Number,
  //   required: true,
  // })
  // @HttpCode(HttpStatus.NO_CONTENT)
  // remove(
  //   @Param('task_id') task_id: Task['task_id'],
  //   @AuthUser() jwtPayload: JwtPayloadType

  // ): Promise<void> {
  //   return this.taskService.delete(task_id,jwtPayload.user_id,);
  // }



  // @Get(':organization_id')
  // @ApiParam({
  //   name: 'organization_id',
  //   type: Number,
  //   required: true,
  // })
  // @HttpCode(HttpStatus.OK)
  // async getAllProj(
  //   @Param('organization_id') organization_id: Task['organization_id'],

  // ): Promise<Task[]> {
  //   let data = await this.taskService.getAllProj(organization_id);
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
  //   @Param('organization_id') organization_id: Task['organization_id'],

  // ): Promise<Task[]> {
  //   let data = await this.taskService.getInsigit(organization_id);
  //   return data;
  // }
}
