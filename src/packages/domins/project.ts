import { Exclude, Expose } from 'class-transformer';
export enum ProjectStatus {
  ACTIVE = "active",
  COMPLETED = "completed"
};
export class Project {
  project_id: number;
  project_title: string 
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export class ProjectUser {
  project_id: number;
user_id:number 
project_user_id:number
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

