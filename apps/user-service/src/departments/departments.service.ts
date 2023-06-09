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
import {
    CREATE_DEPARTMENT,
    DELETE_DEPARTMENT,
    GET_ALL_DEPARTMENTS,
    GET_DEPARTMENT,
    GET_DEPARTMENT_BY_NAME,
} from './departments.queries'
import { UsersService } from '../users/users.service'

@Injectable()
export class DepartmentsService {
    @Inject(PostgresService) private readonly postgres!: PostgresService
    @Inject(UsersService) private readonly usersService!: UsersService

    /**
     * Gets a department by id
     * @param id The id of the department
     * @returns Promise department
     */
    async Get(id: number): Promise<Department | null> {
        try {
            const res = await this.postgres.query<Department>(GET_DEPARTMENT, [
                id,
            ])
            if (!res) {
                return null
            }
            return z.array(departmentSchema).parse(res)[0]
        } catch (error: unknown) {
            Logger.error(error)
            throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_TEXT)
        }
    }

    /**
     *  Gets a department by name
     * @param name The name of the department
     * @returns Promise department
     */
    async GetByName(name: string): Promise<Department | null> {
        try {
            const res = await this.postgres.query<Department>(
                GET_DEPARTMENT_BY_NAME,
                [name]
            )
            if (!res) {
                return null
            }
            return z.array(departmentSchema).parse(res)[0]
        } catch (error: unknown) {
            Logger.error(error)
            throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_TEXT)
        }
    }

    /**
     *  Gets all departments
     * @returns Promise array of departments
     */
    async GetAll(): Promise<Array<Department>> {
        try {
            const res = await this.postgres.query(GET_ALL_DEPARTMENTS)
            return z.array(departmentSchema).parse(res)
        } catch (error: unknown) {
            Logger.error(error)
            throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_TEXT)
        }
    }

    /**
     * Creates a department
     *  @param createDepartmentDto The department to create
     *  @returns Promise department
     */
    async Create(
        createDepartmentDto: CreateDepartmentDto
    ): Promise<Department> {
        try {
            const res = await this.postgres.query<Department>(
                CREATE_DEPARTMENT,
                [createDepartmentDto.name, createDepartmentDto.description]
            )
            return z.array(departmentSchema).parse(res)[0]
        } catch (error: unknown) {
            Logger.error(error)
            throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_TEXT)
        }
    }

    /**
     * Deletes a department
     * @param department The department to delete
     */
    async Delete(department: Department): Promise<void> {
        try {
            await this.postgres.query(DELETE_DEPARTMENT, [department.id])
        } catch (error: unknown) {
            Logger.error(error)
            throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_TEXT)
        }
    }
}
