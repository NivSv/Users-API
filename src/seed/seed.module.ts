import { Module } from '@nestjs/common';
import { DepartmentsService } from '../departments/departments.service';
import { PrismaService } from '../prisma.service';
import { SeedService } from './seed.service';

@Module({
  providers: [SeedService, DepartmentsService, PrismaService],
})
export class SeedModule {}
