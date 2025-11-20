import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';


export class CreateDepartmentDto {

  @ApiProperty({ example: 'nx' })
  @IsNotEmpty()
  department_title: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  organization_id: number;
  @ApiProperty({ example:1 })
  @IsNotEmpty()
  manger_id: number;

}
