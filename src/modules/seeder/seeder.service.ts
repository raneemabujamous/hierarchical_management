import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { OrganizationEntity } from '@/modules/organization/infrastructure/persistence/relational/entities/organization.entity';
import { DepartmentEntity } from '@/modules/department/infrastructure/persistence/relational/entities/department.entity';
import { ProjectEntity } from '@/modules/project/infrastructure/persistence/relational/entities/project.entity';
import { TaskEntity } from '@/modules/task/infrastructure/persistence/relational/entities/task.entity';

@Injectable()
export class SeederService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(OrganizationEntity)
    private readonly orgRepo: Repository<OrganizationEntity>,
    @InjectRepository(DepartmentEntity)
    private readonly deptRepo: Repository<DepartmentEntity>,
    @InjectRepository(ProjectEntity)
    private readonly projectRepo: Repository<ProjectEntity>,
    @InjectRepository(TaskEntity)
    private readonly taskRepo: Repository<TaskEntity>,
  ) {}

  async seed(scale = 1) {
    console.log(`🌱 Starting seeding with scale: ${scale}`);

    await this.dataSource.query(`
      TRUNCATE TABLE task_assignees, task, project, department, organization CASCADE
    `);

    const org = this.orgRepo.create({ organization_title: 'Acme Corp' });
    await this.orgRepo.save(org);

    const numDepartments = Math.floor(100 * scale);
    const departments: DepartmentEntity[] = [];
    for (let i = 1; i <= numDepartments; i++) {
      departments.push(
        this.deptRepo.create({
          department_title: `Department ${i}`,
          organization: org,
        }),
      );
    }
    await this.deptRepo.save(departments);

    for (const dept of departments) {
      const numProjects = Math.floor((Math.random() * 31 + 50) * scale); 
      const projects: ProjectEntity[] = [];
      for (let p = 1; p <= numProjects; p++) {
        projects.push(
          this.projectRepo.create({
            project_title: `Project ${p} - ${dept.department_title}`,
            department: dept,
          }),
        );
      }
      await this.projectRepo.save(projects);

      for (const proj of projects) {
        const numTasks = Math.floor((Math.random() * 101 + 100) * scale); 
        const tasks: TaskEntity[] = [];
        for (let t = 1; t <= numTasks; t++) {
          tasks.push(
            this.taskRepo.create({
              task_title: `Task ${t} - ${proj.project_title}`,
              status: 'todo',
              project: proj,
            }),
          );
        }
        await this.taskRepo.save(tasks);
      }
    }

    console.log('✅ Seeding complete');
  }
}
