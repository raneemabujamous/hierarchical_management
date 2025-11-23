import { Exclude, Expose } from 'class-transformer';
export enum TaskStatus {
  ACTIVE = "active",
  COMPLETED = "completed"
};
export class Task {
  task_id: number;
  task_title: string 
  status:string 
  description:string
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
