import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Department } from '@prisma/client';
import { DepartmentDto } from './departments.dto';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dtos/create-department.dto';

@ApiTags('departments')
@Controller('departments')
export class DepartmentsController {
  @Inject(DepartmentsService)
  private readonly departmentsService!: DepartmentsService;

  @ApiOkResponse({ type: DepartmentDto, isArray: true })
  @Get()
  async findAll(): Promise<Array<Department>> {
    return this.departmentsService.GetAll();
  }

  @Post()
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    return this.departmentsService.Create(createDepartmentDto);
  }

  @ApiOkResponse({ description: 'department deleted' })
  @ApiNotFoundResponse({ description: 'department not found' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const entity = await this.departmentsService.Get(+id);
    if (!entity)
      throw new NotFoundException(`department with id ${id} not found`);
    await this.departmentsService.Delete(entity);
    return;
  }
}
