import { Injectable } from '@nestjs/common'
import { DepartmentDto } from './departments.dto'
import { Department } from './departments.schema'
@Injectable()
export class DepartmentsMapper {
    async toDto(department: Department): Promise<DepartmentDto> {
        return {
            id: department.id,
            name: department.name,
            description: department.description,
            userCount: department.user_count,
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
