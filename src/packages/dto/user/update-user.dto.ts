import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ example: 'raneem@gmail.com' })
  @IsOptional()
  @IsEmail()
  email?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({ example: 'John' })
  @IsOptional()
  first_name?: string | null;

  @ApiPropertyOptional({ example: 'Doe' })
  @IsOptional()
  last_name?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  hash?: string | null;
}
