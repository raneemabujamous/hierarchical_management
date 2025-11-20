import { Exclude, Expose } from 'class-transformer';
export enum TaskStatus {
  ACTIVE = "active",
  COMPLETED = "completed"
};
export class Task {
  task_id: number;
  task_title: string 
  status:TaskStatus 
organization_id:number
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export class TaskUser {
  task_id: number;
user_id:number 
task_user_id:number
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

