import { Inject, Injectable } from '@nestjs/common'
import { PostgresService } from '@niv/postgres'
import { z } from 'nestjs-zod/z'
import { Department } from '../departments/departments.schema'
import { CreateUserDto } from './dtos/create-user.dto'
import { FindFiltersDto } from './dtos/find-filters.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { User, userSchema } from './users.schema'

@Injectable()
export class UsersService {
    @Inject(PostgresService) private readonly postgres!: PostgresService

    async Create(createUserDto: CreateUserDto, department: Department) {
        const user = await this.postgres.query<User>(
            `INSERT INTO users (first_name, last_name, title, email, image, department_id) VALUES ('${createUserDto.firstName}', '${createUserDto.lastName}', '${createUserDto.title}', '${createUserDto.email}', '${createUserDto.image}', ${department.id});`
        )
        return z.array(userSchema).parse(user)[0]
    }

    async GetAll(filters: FindFiltersDto): Promise<Array<User>> {
        const firstNameFilter = filters.firstName
            ? `first_name ILIKE '%${filters.firstName}%' AND`
            : ''
        const lastNameFilter = filters.lastName
            ? `last_name ILIKE '%${filters.lastName}%' AND`
            : ''
        const emailFilter = filters.email
            ? `email ILIKE '%${filters.email}%' AND`
            : ''
        const imageFilter = filters.image
            ? `image ILIKE '%${filters.image}%' AND`
            : ''
        const titleFilter = filters.title
            ? `title ILIKE '%${filters.title}%' AND`
            : ''
        const departmentNameFilter = filters.departmentName
            ? `departments.name ILIKE '%${filters.departmentName}%' AND`
            : ''
        const query = `
      SELECT users.*, departments.name AS department_name
      FROM users
      LEFT JOIN departments ON users.department_id = departments.id
      WHERE
        ${firstNameFilter}
        ${lastNameFilter}
        ${emailFilter}
        ${imageFilter}
        ${titleFilter}
        ${departmentNameFilter}
        first_name IS NOT NULL AND last_name IS NOT NULL
    `
        const res = await this.postgres.query<
            Array<User & { department_name?: string }>
        >(query)
        return z.array(userSchema).parse(res)
    }

    async Get(id: number): Promise<User | null> {
        const user = await this.postgres.query<User>(
            `SELECT * FROM users WHERE id = ${id};`
        )
        return z.array(userSchema).parse(user)[0]
    }

    async Update(
        user: User,
        updateUserDto: UpdateUserDto,
        department: Department
    ): Promise<User> {
        const users = await this.postgres.query<User>(
            `UPDATE users SET first_name = '${updateUserDto.firstName}', last_name = '${updateUserDto.lastName}', title = '${updateUserDto.title}', email = '${updateUserDto.email}', image = '${updateUserDto.image}', department_id = ${department.id} WHERE id = ${user.id};`
        )
        return z.array(userSchema).parse(users)[0]
    }

    async Delete(user: User): Promise<void> {
        await this.postgres.query(`DELETE FROM users WHERE id = ${user.id};`)
    }
}
