import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Department } from '@prisma/client';
import { DepartmentDto } from './departments.dto';
import { DepartmentsService } from './departments.service';

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
}
