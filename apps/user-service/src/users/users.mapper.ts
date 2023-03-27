import { Inject, Injectable } from '@nestjs/common'
import { DepartmentsService } from '../departments/departments.service'
import { UserDto } from './users.dto'
import { User } from './users.schema'

@Injectable()
export class UsersMapper {
    @Inject(DepartmentsService)
    private readonly departmentsService!: DepartmentsService

    async toDto(user: User): Promise<UserDto> {
        return {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            image: user.image,
            title: user.title,
            departmentId: user.department_id,
        }
    }

    async toDtos(users: Array<User>): Promise<Array<UserDto>> {
        return await Promise.all(users.map((user) => this.toDto(user)))
    }
}
