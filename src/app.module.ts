import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectModule } from './modules/project/project.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { DepartmentModule } from './modules/department/department.module';
import { TaskModule } from './modules/task/task.module';
import { NotificationModule } from './modules/notification/notification.module';
@Module({
    imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRootAsync({
        useFactory: () => ({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'MYDKHDR@2018',
          database: 'project_tracker',
          autoLoadEntities: true,
          synchronize: true,
        }),
        dataSourceFactory: async (options: DataSourceOptions | undefined) => {
          if (!options) {
            throw new Error('TypeORM options are undefined.');
          }
          return new DataSource(options).initialize();
        },
      }),

    UserModule,
    AuthModule,
    ProjectModule,
    OrganizationModule,
    DepartmentModule,
    TaskModule,
    NotificationModule
  ],
})
export class AppModule {}
