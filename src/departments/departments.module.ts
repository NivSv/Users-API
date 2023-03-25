import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';

@Module({
  controllers: [DepartmentsController],
  providers: [DepartmentsService, PrismaService],
})
export class DepartmentsModule {}
