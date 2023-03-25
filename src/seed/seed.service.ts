import { Inject, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { DepartmentsService } from '../departments/departments.service';
import { DepartmentsSeed } from './seed.contant';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  @Inject(DepartmentsService)
  private readonly departmentsService!: DepartmentsService;
  async onApplicationBootstrap() {
    const departments = await this.departmentsService.GetAll();
    if (departments.length === 0) {
      Logger.log('Seeding departments data...');
      for (const department of DepartmentsSeed) {
        await this.departmentsService.Create(department.name);
      }
      Logger.log('Seeding departments done!');
    }
  }
}
