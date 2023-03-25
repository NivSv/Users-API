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
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './users.dto';
import { UsersMapper } from './users.mapper';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  @Inject(UsersService) private readonly usersService!: UsersService;
  @Inject(DepartmentsService)
  private readonly departmentsService!: DepartmentsService;
  @Inject(UsersMapper) private readonly usersMapper!: UsersMapper;

  @ApiCreatedResponse({ type: UserDto })
  @ApiNotFoundResponse({ description: 'department not found' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const department = await this.departmentsService.GetByName(
      createUserDto.department,
    );
    if (!department)
      throw new NotFoundException(
        `department with that name '${createUserDto.department}' does not exist`,
      );
    return this.usersMapper.toDto(
      await this.usersService.Create(createUserDto, department),
    );
  }

  @ApiOkResponse({ type: UserDto, isArray: true })
  @ApiQuery({ name: 'firstName', required: false })
  @ApiQuery({ name: 'lastName', required: false })
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'email', required: false })
  @ApiQuery({ name: 'image', required: false })
  @ApiQuery({ name: 'department', required: false })
  @Get()
  async findAll(
    @Query() findFiltersDto: FindFiltersDto,
  ): Promise<Array<UserDto>> {
    return this.usersMapper.toDtos(
      await this.usersService.GetAll(findFiltersDto),
    );
  }

  @ApiNotFoundResponse({ description: 'user not found' })
  @ApiOkResponse({ type: UserDto })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    if (!id) throw new BadRequestException('id is required');
    const userEntity = await this.usersService.Get(parseInt(id));
    if (!userEntity)
      throw new NotFoundException(`user with id '${id}' does not exist`);
    return this.usersMapper.toDto(userEntity);
  }

  @ApiOkResponse({ type: UserDto })
  @ApiNotFoundResponse({ description: 'user not found' })
  @ApiNotFoundResponse({ description: 'department not found' })
  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
    const entity = await this.usersService.Get(updateUserDto.id);
    if (!entity)
      throw new NotFoundException(
        `user with id '${updateUserDto.id}' does not exist`,
      );
    const department = await this.departmentsService.GetByName(
      updateUserDto.department,
    );
    if (!department)
      throw new NotFoundException(
        `department with that name '${updateUserDto.department}' does not exist`,
      );
    return this.usersMapper.toDto(
      await this.usersService.Update(entity, updateUserDto, department),
    );
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
