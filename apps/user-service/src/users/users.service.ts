import {
    Inject,
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common'
import { PostgresService } from '@niv/postgres'
import { z } from 'nestjs-zod/z'
import { Department } from '../departments/departments.schema'
import { INTERNAL_SERVER_ERROR_TEXT } from '../errors.constants'
import { CreateUserDto } from './dtos/create-user.dto'
import { FindFiltersDto } from './dtos/find-filters.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import {
    CREATE_USER,
    DELETE_USER,
    GET_ALL_USERS,
    GET_ALL_USERS_BY_DEPARTMENT_ID,
    GET_USER_BY_ID,
    UPDATE_USER,
} from './users.queries'
import { User, userSchema } from './users.schema'

@Injectable()
export class UsersService {
    @Inject(PostgresService) private readonly postgres!: PostgresService

    /**
     * Create a new user
     * @param createUserDto CreateUserDto
     * @param department Department
     * @returns Promise user
     *
     */
    async Create(
        createUserDto: CreateUserDto,
        department: Department
    ): Promise<User> {
        try {
            const user = await this.postgres.query(CREATE_USER, [
                createUserDto.firstName,
                createUserDto.lastName,
                createUserDto.title,
                createUserDto.email,
                createUserDto.image,
                department.id,
            ])
            return z.array(userSchema).parse(user)[0]
        } catch (error: unknown) {
            Logger.error(error)
            throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_TEXT)
        }
    }

    /**
     * Get all users with optional filters
     * @param filters FindFiltersDto | undefined
     * @returns Promise array of users
     */
    async GetAll(filters?: FindFiltersDto): Promise<Array<User>> {
        try {
            const res = await this.postgres.query(GET_ALL_USERS, [filters])
            return z.array(userSchema).parse(res)
        } catch (error: unknown) {
            Logger.error(error)
            throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_TEXT)
        }
    }

    /**
     * Get all users by department id
     * @param departmentId number
     * @returns Promise array of users
     */
    async GetAllByDepartmentId(departmentId: number): Promise<Array<User>> {
        try {
            const users = await this.postgres.query<User>(
                GET_ALL_USERS_BY_DEPARTMENT_ID,
                [departmentId]
            )
            return z.array(userSchema).parse(users)
        } catch (error: unknown) {
            Logger.error(error)
            throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_TEXT)
        }
    }

    /**
     * Get a user by id
     * @param id number
     * @returns Promise user or null
     */
    async Get(id: number): Promise<User | null> {
        try {
            const users = await this.postgres.query(GET_USER_BY_ID, [id])
            if (!users) return null
            return z.array(userSchema).parse(users)[0]
        } catch (error: unknown) {
            Logger.error(error)
            throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_TEXT)
        }
    }

    /**
     * Update a user
     * @param user User
     * @param updateUserDto UpdateUserDto
     * @param department Department
     * @returns Promise user
     */
    async Update(
        user: User,
        updateUserDto: UpdateUserDto,
        department: Department
    ): Promise<User> {
        try {
            const users = await this.postgres.query(UPDATE_USER, [
                user.id,
                updateUserDto.firstName,
                updateUserDto.lastName,
                updateUserDto.title,
                updateUserDto.email,
                updateUserDto.image,
                department.id,
            ])
            return z.array(userSchema).parse(users)[0]
        } catch (error: unknown) {
            Logger.error(error)
            throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_TEXT)
        }
    }

    /**
     * Delete a user
     * @param user User
     */
    async Delete(user: User): Promise<void> {
        try {
            await this.postgres.query(DELETE_USER, [user.id])
        } catch (error: unknown) {
            Logger.error(error)
            throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_TEXT)
        }
    }
}
