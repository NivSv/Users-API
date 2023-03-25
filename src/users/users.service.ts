import { Inject, Injectable } from '@nestjs/common';
import { Department, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindFiltersDto } from './dtos/find-filters.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  @Inject(PrismaService) private readonly prisma!: PrismaService;

  async Create(createUserDto: CreateUserDto, department: Department) {
    return this.prisma.user.create({
      data: {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        title: createUserDto.title,
        email: createUserDto.email,
        image: createUserDto.image,
        departmentId: department.id,
      },
    });
  }

  async GetAll(filters: FindFiltersDto) {
    return this.prisma.user.findMany({
      where: {
        firstName: {
          contains: filters.firstName || undefined,
        },
        lastName: {
          contains: filters.lastName || undefined,
        },
        title: {
          contains: filters.title || undefined,
        },
        email: {
          contains: filters.email || undefined,
        },
        image: {
          contains: filters.image || undefined,
        },
      },
    });
  }

  async Get(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async Update(
    user: User,
    updateUserDto: UpdateUserDto,
    department: Department,
  ): Promise<User> {
    return await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
        title: updateUserDto.title,
        image: updateUserDto.image,
        departmentId: department.id,
      },
    });
  }

  async Delete(user: User): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: user.id,
      },
    });
  }
}
