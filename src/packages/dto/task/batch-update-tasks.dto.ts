import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayNotEmpty, IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class BatchUpdateTasksDto {

  @ApiProperty({
    example: [1, 2, 3],
    description: 'Array of task IDs to update',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  taskIds: number[];

  @ApiProperty({
    example: 'in_progress',
    description: 'New status to apply to the tasks',
  })
  @IsString()
  @IsNotEmpty()
  status: string;
}
