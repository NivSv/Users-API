import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { DepartmentsService } from '../departments/departments.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindFiltersDto } from './dtos/find-filters.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  @Inject(UsersService) private readonly usersService!: UsersService;
  @Inject(DepartmentsService)
  private readonly departmentsService!: DepartmentsService;

  @ApiCreatedResponse({ type: CreateUserDto })
  @ApiNotFoundResponse({ description: 'department not found' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    const department = await this.departmentsService.GetByName(
      createUserDto.department,
    );
    if (!department)
      throw new NotFoundException(
        `department with that name '${createUserDto.department}' does not exist`,
      );
    return await this.usersService.Create(createUserDto, department);
  }

  @ApiQuery({ name: 'firstName', required: false })
  @ApiQuery({ name: 'lastName', required: false })
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'email', required: false })
  @ApiQuery({ name: 'image', required: false })
  @ApiQuery({ name: 'department', required: false })
  @Get()
  async findAll(@Query() findFiltersDto: FindFiltersDto): Promise<any> {
    return await this.usersService.GetAll(findFiltersDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    if (!id) throw new BadRequestException('id is required');
    return id;
  }

  @Patch()
  async update(@Body() createUserDto: CreateUserDto): Promise<any> {
    return createUserDto;
  }

  @ApiOkResponse({ description: 'user deleted' })
  @ApiNotFoundResponse({ description: 'user not found' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    if (!id) throw new BadRequestException('id is required');
    const userEntity = await this.usersService.Get(parseInt(id));
    if (!userEntity)
      throw new NotFoundException(`user with id '${id}' does not exist`);
    await this.usersService.Delete(userEntity);
    return;
  }
}
