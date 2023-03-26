import { Inject, Injectable } from '@nestjs/common';
import { PostgresService } from '@niv/postgres';
import { z } from 'nestjs-zod/z';
import { Department, departmentSchema } from './departments.schema';
import { CreateDepartmentDto } from './dtos/create-department.dto';

@Injectable()
export class DepartmentsService {
  @Inject(PostgresService) private readonly postgres!: PostgresService;

  async Get(id: number): Promise<Department | null> {
    const res = await this.postgres.query<Department>(
      `SELECT * FROM departments WHERE id = ${id};`,
    );
    return z.array(departmentSchema).parse(res)[0];
  }

  async GetByName(name: string): Promise<Department | null> {
    const res = await this.postgres.query<Department>(
      `SELECT * FROM departments WHERE name = '${name}';`,
    );
    return z.array(departmentSchema).parse(res)[0];
  }

  async GetAll(): Promise<Array<Department>> {
    return await this.postgres.query<Department>(`SELECT * FROM departments;`);
  }

  async Create(createDepartmentDto: CreateDepartmentDto): Promise<void> {
    await this.postgres.query<Department>(
      `INSERT INTO departments (name, description) VALUES ('${createDepartmentDto.name}', '${createDepartmentDto.description}');`,
    );
  }

  async Update(department: Department, description: string): Promise<void> {
    await this.postgres.query<Department>(
      `UPDATE departments SET description = '${description}' WHERE id = ${department.id};`,
    );
  }

  async Delete(department: Department): Promise<void> {
    await this.postgres.query(
      `DELETE FROM departments WHERE id = ${department.id};`,
    );
  }
}
