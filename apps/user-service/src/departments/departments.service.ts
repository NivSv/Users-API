import {
    Inject,
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common'
import { PostgresService } from '@niv/postgres'
import { z } from 'nestjs-zod/z'
import { INTERNAL_SERVER_ERROR_TEXT } from '../errors.constants'
import { Department, departmentSchema } from './departments.schema'
import { CreateDepartmentDto } from './dtos/create-department.dto'
import { GET_ALL_DEPARTMENTS } from './departments.queries'

@Injectable()
export class DepartmentsService {
    @Inject(PostgresService) private readonly postgres!: PostgresService

    async Get(id: number): Promise<Department | null> {
        try {
            const res = await this.postgres.query<Department>(
                `SELECT * FROM departments WHERE id = ${id};`
            )
            if (res.length === 0) {
                return null
            }
            return z.array(departmentSchema).parse(res)[0]
        } catch (error: unknown) {
            Logger.error(error)
            throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_TEXT)
        }
    }

    async GetByName(name: string): Promise<Department | null> {
        try {
            const res = await this.postgres.query<Department>(
                `SELECT * FROM departments WHERE name = '${name}';`
            )
            return z.array(departmentSchema).parse(res)[0]
        } catch (error: unknown) {
            Logger.error(error)
            throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_TEXT)
        }
    }

    async GetAll(): Promise<Array<Department>> {
        try {
            const res = await this.postgres.query(GET_ALL_DEPARTMENTS)
            return z.array(departmentSchema).parse(res)
        } catch (error: unknown) {
            Logger.error(error)
            throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_TEXT)
        }
    }

    async Create(
        createDepartmentDto: CreateDepartmentDto
    ): Promise<Department> {
        try {
            const res = await this.postgres.query<Department>(
                `INSERT INTO departments (name, description) VALUES ('${createDepartmentDto.name}', '${createDepartmentDto.description}');`
            )
            return z.array(departmentSchema).parse(res)[0]
        } catch (error: unknown) {
            Logger.error(error)
            throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_TEXT)
        }
    }

    async Update(
        department: Department,
        description: string
    ): Promise<Department> {
        try {
            const res = await this.postgres.query<Department>(
                `UPDATE departments SET description = '${description}' WHERE id = ${department.id};`
            )
            return z.array(departmentSchema).parse(res)[0]
        } catch (error: unknown) {
            Logger.error(error)
            throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_TEXT)
        }
    }

    async Delete(department: Department): Promise<void> {
        try {
            await this.postgres.query(
                `DELETE FROM departments WHERE id = ${department.id};`
            )
        } catch (error: unknown) {
            Logger.error(error)
            throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_TEXT)
        }
    }
}
