import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindFiltersDto } from './dtos/find-filters.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return createUserDto;
  }

  @ApiQuery({ name: 'firstName', required: false })
  @ApiQuery({ name: 'lastName', required: false })
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'email', required: false })
  @ApiQuery({ name: 'image', required: false })
  @ApiQuery({ name: 'department', required: false })
  @Get()
  async findAll(@Query() findFiltersDto: FindFiltersDto): Promise<any> {
    return findFiltersDto;
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
}
