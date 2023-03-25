import { Inject, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { DepartmentsService } from '../departments/departments.service';
import { UsersService } from '../users/users.service';
import { UtilsService } from '../utils/utils.service';
import { DepartmentsSeed, Titles, UsersNumberSeed } from './seed.constants';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  @Inject(DepartmentsService)
  private readonly departmentsService!: DepartmentsService;
  @Inject(UsersService) private readonly usersService!: UsersService;
  @Inject(UtilsService) private readonly utilsService!: UtilsService;

  async onApplicationBootstrap() {
    const departments = await this.departmentsService.GetAll();
    const users = await this.usersService.GetAll({});

    if (departments.length === 0 && users.length === 0) {
      Logger.log('Seeding data...');
      for (const department of DepartmentsSeed) {
        await this.departmentsService.Create(
          department.name,
          department.description,
        );
      }
      const afterSeedDepartments = await this.departmentsService.GetAll();
      new Array(UsersNumberSeed)
        .fill(0, 0, UsersNumberSeed)
        .forEach(async (i, index) => {
          const department =
            afterSeedDepartments[
              this.utilsService.getRandomInt(0, afterSeedDepartments.length - 1)
            ];
          const title =
            Titles[department.name][this.utilsService.getRandomInt(0, 2)];
          await this.usersService.Create(
            {
              firstName: 'Jon',
              lastName: 'Doe ' + index,
              email: 'jon.doe' + index + '@gmail.com',
              image: 'https://picsum.photos/200',
              title: title,
            },
            department,
          );
        });
      Logger.log('Seeding done!');
    }
  }
}
