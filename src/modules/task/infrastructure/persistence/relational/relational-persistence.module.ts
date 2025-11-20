import { Module } from '@nestjs/common';
import { TaskRepository } from '../task.repository';
import { TasksRelationalRepository } from './repositories/task.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity , ])],
  providers: [
    {
      provide: TaskRepository,
      useClass: TasksRelationalRepository,
    },
  ],
  exports: [TaskRepository],
})
export class RelationalTaskPersistenceModule {}
