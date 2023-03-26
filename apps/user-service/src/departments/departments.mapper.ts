import { Inject, Injectable } from '@nestjs/common'
import { DepartmentsService } from '../departments/departments.service'
import { UsersService } from '../users/users.service'
import { DepartmentDto } from './departments.dto'
import { Department } from './departments.schema'
@Injectable()
export class DepartmentsMapper {
    @Inject(DepartmentsService)
    private readonly departmentsService!: DepartmentsService
    @Inject(UsersService)
    private readonly userService!: UsersService

    async toDto(department: Department): Promise<DepartmentDto> {
        const users = await this.userService.GetAllByDepartmentId(department.id)
        return {
            id: department.id,
            name: department.name,
            description: department.description,
            userCount: users.length,
        }
    }

    async toDtos(
        departments: Array<Department>
    ): Promise<Array<DepartmentDto>> {
        return await Promise.all(
            departments.map((department) => this.toDto(department))
        )
    }
}
