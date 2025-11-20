import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, MinLength } from 'class-validator';
import { Role } from '@/modules/user/infrastructure/persistence/relational/entities/role.enum';
export class CreateUserDto {
  @ApiProperty({ example: 'rabujamous@.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string | null;

  @ApiProperty()
  @MinLength(6)
  password?: string;


  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  first_name: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  last_name: string | null;



  @ApiProperty({ example: '[ admin , manager, employee ]' })
  role?: Role;

}
