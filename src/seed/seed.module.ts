import { Module } from '@nestjs/common';
import { DepartmentsService } from '../departments/departments.service';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';
import { UtilsService } from '../utils/utils.service';
import { SeedService } from './seed.service';

@Module({
  providers: [
    SeedService,
    DepartmentsService,
    PrismaService,
    UsersService,
    UtilsService,
  ],
})
export class SeedModule {}
