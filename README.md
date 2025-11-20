## Notes

- The **database is live**.
- The **frontend and backend are not deployed** yet—run them locally.

---
## install dep 
npm i 
## Backend

# Start the API server:

npm run start:dev


# Runs on: http://localhost:8080

# Swagger docs: http://localhost:8080/docs

# Repo: https://github.com/raneemabujamous/project-tracker-backend

## Frontend

# Start the web app:

 npm run dev


# Repo: https://github.com/raneemabujamous/project-tracker-frontend



# Database (PostgreSQL / Neon)
DB_TYPE=postgres
DB_HOST=ep-shy-flower-a4icb1qv-pooler.us-east-1.aws.neon.tech
DB_PORT=5432
DB_USER=neondb_owner
DB_PASSWORD=your_password
DB_NAME=project-tracker
DB_SSL=true
# If you hit local cert issues, you can set:
# DB_SSL_REJECT_UNAUTHORIZED=true
npm run start:dev     # start with watch mode


## API & Features
1) Authentication

JWT-based (or Supabase Auth if you wire it up)

Sign-up, login, logout

Users can access only their own organization’s data

2) Organizations (CRUD)

Create, read organizations

Fields: name

Users belong to one organization

3) Projects (CRUD)

Create, read, update, delete

Fields: title, description, status (active | completed), created_at

Each project belongs to an organization (multi-tenant isolation)

4) Analytics (implemented)

Totals per organization / per user

Active vs. completed counts

 Average completion time

Endpoints exposed in Swagger under an Analytics tag



// nestjs-typeorm-hierarchy-entities-and-services.ts
// Single-file reference for entities, seed service, notif batching, RBAC guard examples.
// Drop into a NestJS app (TypeORM) and split into modules/files as needed.

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Unique,
  Generated,
} from 'typeorm';

/* -------------------------
   Role enum
   ------------------------- */
export enum Role {
  ADMIN = 'admin',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
}

/* -------------------------
   Organization
   ------------------------- */
@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 200 })
  name: string;

  @OneToMany(() => Department, (d) => d.organization, { cascade: true })
  departments: Department[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

/* -------------------------
   Department
   - Many departments per organization
   - Each department can have an assigned manager (User)
   ------------------------- */
@Entity()
@Index(['organization', 'name'])
export class Department {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 200 })
  name: string;

  @ManyToOne(() => Organization, (o) => o.departments, { onDelete: 'CASCADE' })
  organization: Organization;

  // Manager relation: a user can manage many departments
  @ManyToOne(() => User, (u) => u.managedDepartments, { nullable: true, onDelete: 'SET NULL' })
  manager: User | null;

  @OneToMany(() => Project, (p) => p.department, { cascade: true })
  projects: Project[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

/* -------------------------
   Project
   ------------------------- */
@Entity()
@Index(['department', 'name'])
export class Project {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 250 })
  name: string;

  @ManyToOne(() => Department, (d) => d.projects, { onDelete: 'CASCADE' })
  department: Department;

  @OneToMany(() => Task, (t) => t.project, { cascade: true })
  tasks: Task[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

/* -------------------------
   Task
   - Tasks belong to a project
   - Tasks can be assigned to multiple employees (many-to-many)
   - optimistic locking via version (optional)
   ------------------------- */
@Entity()
@Index(['project', 'status'])
export class Task {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 500 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 50, default: 'todo' })
  status: string;

  @ManyToOne(() => Project, (p) => p.tasks, { onDelete: 'CASCADE' })
  project: Project;

  // Employees assigned to this task
  @ManyToMany(() => User, (u) => u.assignedTasks)
  @JoinTable({ name: 'task_assignees' })
  assignees: User[];

  @Column({ default: false })
  archived: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

/* -------------------------
   User
   - stores role
   - Users can manage Departments and be assigned to Tasks
   ------------------------- */
@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 200 })
  fullName: string;

  @Index()
  @Column({ length: 200 })
  email: string;

  @Column({ type: 'enum', enum: Role, default: Role.EMPLOYEE })
  role: Role;

  // hashed password - store securely
  @Column({ length: 500, nullable: true })
  passwordHash: string | null;

  // Managed departments
  @OneToMany(() => Department, (d) => d.manager)
  managedDepartments: Department[];

  // Tasks assigned
  @ManyToMany(() => Task, (t) => t.assignees)
  assignedTasks: Task[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

/* -------------------------
   Notifications
   - Persisted notification entries (batched)
   - We store aggregated messages like "5 tasks updated in Project X"
   ------------------------- */
@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: string;

  // optional: link to organization/department/project
  @ManyToOne(() => Project, { nullable: true, onDelete: 'SET NULL' })
  project: Project | null;

  @Column({ length: 100 })
  type: string; // e.g., 'task_update_batch'

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'json', nullable: true })
  meta: any | null; // e.g., { count: 5, taskIds: [...] }

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn()
  createdAt: Date;
}

/* -------------------------
   Design notes (split files in a real project):
   - Put each entity into its own file under /src/entities
   - Create repositories/services per entity
   ------------------------- */

/* -------------------------
   PermissionService (helper, conceptual)
   - Centralizes permission checks used by guards/controllers
   ------------------------- */
export class PermissionService {
  // repositories are injected in Nest normally; shown as placeholders
  constructor(private readonly userRepo: any, private readonly deptRepo: any, private readonly taskRepo: any) {}

  async isAdmin(userId: string) {
    const u = await this.userRepo.findOne({ where: { id: userId } });
    return u?.role === Role.ADMIN;
  }

  // Check if user is manager of a department
  async isManagerOfDepartment(userId: string, departmentId: string) {
    const dept = await this.deptRepo.findOne({ where: { id: departmentId }, relations: ['manager'] });
    return dept?.manager?.id === userId;
  }

  // For checking access to a project: manager of department or admin
  async canManageProject(userId: string, projectId: string) {
    const project = await this.deptRepo.manager.getRepository(Project).findOne({ where: { id: projectId }, relations: ['department', 'department.manager'] });
    if (!project) return false;
    if ((await this.isAdmin(userId))) return true;
    return project.department.manager?.id === userId;
  }

  // Employee access: assigned to task or higher privilege
  async canEditTask(userId: string, taskId: string) {
    if (await this.isAdmin(userId)) return true;

    const task = await this.taskRepo.findOne({ where: { id: taskId }, relations: ['assignees', 'project', 'project.department', 'project.department.manager'] });
    if (!task) return false;

    // manager of the department
    if (task.project.department.manager?.id === userId) return true;

    // assigned employee
    if (task.assignees.some((a) => a.id === userId)) return true;

    return false;
  }
}

/* -------------------------
   RolesGuard example (simplified)
   - Use Nest's CanActivate, JwtAuthGuard etc in real project
   ------------------------- */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly requiredRoles: Role[]) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user = req.user; // assumed to be set by JwtAuthGuard
    if (!user) return false;
    if (user.role === Role.ADMIN) return true; // admins always pass
    return this.requiredRoles.includes(user.role);
  }
}

/* -------------------------
   SeedService
   - Endpoint or CLI that creates realistic data using a SEED_SCALE env var
   - Use faker (npm i @faker-js/faker) or your preferred data generator
   - Save in batches for performance
   ------------------------- */
import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

@Injectable()
export class SeedService {
  constructor(
    // inject repositories
    private readonly orgRepo: any,
    private readonly deptRepo: any,
    private readonly projectRepo: any,
    private readonly taskRepo: any,
    private readonly userRepo: any,
  ) {}

  private parseScale() {
    const raw = process.env.SEED_SCALE ?? '1';
    const n = Number(raw);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }

  async generate() {
    const scale = this.parseScale();

    // target counts (base):
    const DEPTS = Math.round(100 * scale);
    const PROJECTS_PER_DEPT = (min = 50, max = 80) => Math.round((min + Math.random() * (max - min)) * scale);
    const TASKS_PER_PROJECT = (min = 100, max = 200) => Math.round((min + Math.random() * (max - min)) * scale);

    // create an organization
    const org = this.orgRepo.create({ name: `Org ${faker.company.name()}` });
    await this.orgRepo.save(org);

    // optionally pre-create a pool of users (admins/managers/employees)
    const admins = [];
    const managers: any[] = [];
    const employees: any[] = [];

    // create 5 admins
    for (let i = 0; i < Math.max(1, Math.round(5 * scale)); i++) {
      const a = this.userRepo.create({ fullName: faker.person.fullName(), email: faker.internet.email(), role: Role.ADMIN, passwordHash: '!' });
      admins.push(a);
    }
    await this.userRepo.save(admins);

    // create a pool of employees
    const EMP_POOL = Math.max(500, Math.round(2000 * scale));
    const empBatch = [];
    for (let i = 0; i < EMP_POOL; i++) {
      empBatch.push(this.userRepo.create({ fullName: faker.person.fullName(), email: faker.internet.email(), role: Role.EMPLOYEE, passwordHash: '!' }));
      if (empBatch.length >= 500) {
        await this.userRepo.save(empBatch.splice(0));
      }
    }
    if (empBatch.length) await this.userRepo.save(empBatch);

    // now create departments
    for (let d = 0; d < DEPTS; d++) {
      const manager = this.userRepo.create({ fullName: faker.person.fullName(), email: faker.internet.email(), role: Role.MANAGER, passwordHash: '!' });
      await this.userRepo.save(manager);

      const dept = this.deptRepo.create({ name: `Dept ${d + 1} - ${faker.company.buzzword()}`, organization: org, manager });
      await this.deptRepo.save(dept);

      const projectsCount = PROJECTS_PER_DEPT();
      const projectsToSave = [];
      for (let p = 0; p < projectsCount; p++) {
        const project = this.projectRepo.create({ name: `Project ${d + 1}.${p + 1} - ${faker.commerce.productName()}`, department: dept });
        projectsToSave.push(project);
      }
      await this.projectRepo.save(projectsToSave);

      // create tasks per project in batches
      for (const proj of projectsToSave) {
        const tasksCount = TASKS_PER_PROJECT();
        const tasksBatch = [];
        for (let t = 0; t < tasksCount; t++) {
          const task = this.taskRepo.create({
            title: faker.lorem.sentence(6),
            description: faker.lorem.paragraph(),
            status: ['todo', 'in_progress', 'done'][Math.floor(Math.random() * 3)],
            project: proj,
          });

          // assign 0..3 random employees
          const assigneesCount = Math.random() < 0.6 ? Math.floor(Math.random() * 3) : 0;
          if (assigneesCount > 0) {
            // naive: pick random employees from DB - for speed in real seed, prefetch employee ids
            // Here we leave assignees to be assigned after bulk insert to avoid heavy joins
          }

          tasksBatch.push(task);

          if (tasksBatch.length >= 500) {
            await this.taskRepo.save(tasksBatch.splice(0));
          }
        }
        if (tasksBatch.length) await this.taskRepo.save(tasksBatch);
      }
    }

    return { ok: true, orgId: org.id };
  }
}

/* -------------------------
   Notification batching service
   - Approach: event collectors + periodic flush (or immediate aggregation window)
   - Keep in-memory aggregator for short window (e.g., 5s) and flush to DB as aggregated Notification rows.
   - For production, implement in a background worker + Redis to coordinate across nodes.
   ------------------------- */
import { Repository } from 'typeorm';

export class NotificationBatchService {
  // in-memory map: key -> { count, taskIds, timer }
  private aggregators: Map<string, { count: number; taskIds: string[]; timeout: NodeJS.Timeout | null }> = new Map();
  private FLUSH_MS = 5000; // aggregate events within 5 seconds

  constructor(private readonly notifRepo: Repository<Notification>) {}

  // Called whenever a task update event happens
  async pushTaskUpdate(projectId: string, taskId: string) {
    const key = `project:${projectId}:task_updates`;
    const existing = this.aggregators.get(key);

    if (existing) {
      existing.count += 1;
      existing.taskIds.push(taskId);
    } else {
      const entry = { count: 1, taskIds: [taskId], timeout: null };
      entry.timeout = setTimeout(() => this.flushKey(key), this.FLUSH_MS);
      this.aggregators.set(key, entry);
    }
  }

  private async flushKey(key: string) {
    const entry = this.aggregators.get(key);
    if (!entry) return;

    // parse project id from key
    const [, projectId] = key.split(':');

    const message = `${entry.count} tasks updated in Project ${projectId}`;

    const notif = this.notifRepo.create({ project: { id: projectId } as any, type: 'task_update_batch', message, meta: { count: entry.count, taskIds: entry.taskIds } });
    await this.notifRepo.save(notif);

    // cleanup
    if (entry.timeout) clearTimeout(entry.timeout);
    this.aggregators.delete(key);
  }

  // manual flush for graceful shutdown
  async flushAll() {
    const keys = Array.from(this.aggregators.keys());
    await Promise.all(keys.map((k) => this.flushKey(k)));
  }
}

/* -------------------------
   Controller example for notification endpoint & seed trigger
   ------------------------- */
import { Controller, Post, Body, Get, Param } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  constructor(private readonly seedService: SeedService, private readonly notifRepo: Repository<Notification>) {}

  // trigger seeding (protect with admin guard in real app)
  @Post('seed')
  async seed(@Body() body: { scale?: number }) {
    if (body?.scale) process.env.SEED_SCALE = String(body.scale);
    return this.seedService.generate();
  }

  @Get('notifications')
  async listNotifications() {
    return this.notifRepo.find({ order: { createdAt: 'DESC' }, take: 100 });
  }
}

/* -------------------------
   Additional production considerations (short):
   - Use DB indices on foreign keys and common query columns (status, createdAt).
   - For large writes (seed), use bulk inserts and disable logging for speed.
   - Use connection pooling and tune TypeORM pool size to match DB capacity.
   - For notifications & heavy concurrency: use Redis + worker queue (BullMQ) and store aggregated notifications in DB via workers.
   - Consider partitioning notifications table by time or project if it grows huge.
   - Add pagination and cursor-based queries for API endpoints.
   - Use Sentry/monitoring to watch slow queries.

   -------------------------
   How to split this into real files: entities/ (Organization.ts ...), services/ (seed.service.ts, notification-batch.service.ts), controllers/, guards/, modules/
*/
