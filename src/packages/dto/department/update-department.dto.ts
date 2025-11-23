import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';


export class UpdateDepartmentDto {

  @ApiProperty({ example: 'nx' })
  @IsNotEmpty()
  department_title: string;

}
