import { Exclude, Expose } from 'class-transformer';

export class Department {
  department_id: number;
  department_title: string 
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
