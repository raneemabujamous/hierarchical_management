import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

 enum ProjectStatus {
  ACTIVE = "active",
  COMPLETED = "completed"
}

export class CreateProjectDto {


  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  project_title: string ;

  @ApiProperty({ example:1 })
  @IsNotEmpty()
  department_id: number ;
}



