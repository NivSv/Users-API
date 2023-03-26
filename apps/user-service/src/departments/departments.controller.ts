import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    NotFoundException,
    Param,
    Post,
} from '@nestjs/common'
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { DepartmentDto } from './departments.dto'
import { DepartmentsMapper } from './departments.mapper'
import { DepartmentsService } from './departments.service'
import { CreateDepartmentDto } from './dtos/create-department.dto'

@ApiTags('departments')
@Controller('departments')
export class DepartmentsController {
    @Inject(DepartmentsService)
    private readonly departmentsService!: DepartmentsService
    @Inject(DepartmentsMapper)
    private readonly departmentsMapper!: DepartmentsMapper

    @ApiOkResponse({ type: DepartmentDto, isArray: true })
    @Get()
    async findAll(): Promise<Array<DepartmentDto>> {
        return this.departmentsMapper.toDtos(
            await this.departmentsService.GetAll()
        )
    }

    @Post()
    async create(
        @Body() createDepartmentDto: CreateDepartmentDto
    ): Promise<any> {
        return this.departmentsService.Create(createDepartmentDto)
    }

    @ApiOkResponse({ description: 'department deleted' })
    @ApiNotFoundResponse({ description: 'department not found' })
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        const entity = await this.departmentsService.Get(+id)
        if (!entity)
            throw new NotFoundException(`department with id ${id} not found`)
        await this.departmentsService.Delete(entity)
        return
    }
}
