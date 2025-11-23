import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional,IsNotEmpty, IsArray, ArrayNotEmpty, IsInt, Min } from 'class-validator';

 enum TaskStatus {
  ACTIVE = "active",
  COMPLETED = "completed"
}

export class CreateTaskDto {

  @ApiProperty({ example: 'completed' })
  @IsNotEmpty()
  status: TaskStatus;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  task_title: string ;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  description: string ;

  @ApiProperty({ example:[2,2] })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Number)
  assignee_ids?: number[]; // user ids to assign

  @ApiProperty({ example:1 })
  @IsNotEmpty()
  project_id: number ;

}

export class CreateUserTaskDto {


  @ApiProperty({ example: 1})
  @IsNotEmpty()
  task_id: number ;

  @ApiProperty({ example:1 })
  @IsNotEmpty()
  user_id: number ;
}
