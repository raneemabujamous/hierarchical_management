import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

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

  @ApiProperty({ example:1 })
  @IsNotEmpty()
  organization_id: number ;
}

export class CreateUserTaskDto {


  @ApiProperty({ example: 1})
  @IsNotEmpty()
  task_id: number ;

  @ApiProperty({ example:1 })
  @IsNotEmpty()
  user_id: number ;
}
