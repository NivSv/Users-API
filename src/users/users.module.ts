import { Module } from '@nestjs/common';
import { DepartmentsService } from '../departments/departments.service';
import { PrismaService } from '../prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, DepartmentsService],
})
export class UsersModule {}
