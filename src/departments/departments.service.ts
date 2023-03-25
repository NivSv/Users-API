import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Department } from '@prisma/client';
import { CreateDepartmentDto } from './dtos/create-department.dto';

@Injectable()
export class DepartmentsService {
  @Inject(PrismaService) private readonly prisma!: PrismaService;

  async Get(id: number): Promise<Department | null> {
    return this.prisma.department.findUnique({
      where: {
        id: id,
      },
    });
  }

  async GetByName(name: string): Promise<Department | null> {
    return this.prisma.department.findUnique({
      where: {
        name: name,
      },
    });
  }

  async GetAll(): Promise<Department[]> {
    return this.prisma.department.findMany();
  }

  async Create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return this.prisma.department.create({
      data: {
        name: createDepartmentDto.name,
        description: createDepartmentDto.description,
      },
    });
  }

  async Update(
    department: Department,
    description: string,
  ): Promise<Department> {
    return this.prisma.department.update({
      where: {
        id: department.id,
      },
      data: {
        description: description,
      },
    });
  }

  async Delete(department: Department): Promise<void> {
    this.prisma.department.delete({
      where: {
        id: department.id,
      },
    });
  }
}
