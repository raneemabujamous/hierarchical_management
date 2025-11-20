import { Task, TaskUser } from '@/packages/domins';
import { TaskEntity } from '../entities/task.entity';
export class TaskMapper {
  static toDomain(entity: TaskEntity): Task {
    const task = new Task();
    task.task_id = entity.task_id;
        task.task_title = entity.task_title;
    task.createdAt = entity.createdAt;
    task.updatedAt = entity.updatedAt;
    return task;
  }

  static toPersistence(task: Task): TaskEntity {
    const entity = new TaskEntity();
    entity.task_id = task.task_id;
    entity.task_title = task.task_title;
    entity.status = task.status;
    entity.createdAt = task.createdAt;
    entity.updatedAt = task.updatedAt;

    return entity;
  }
}

