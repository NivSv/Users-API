import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DepartmentsService } from '../departments/departments.service';
import { UserDto } from './users.dto';

@Injectable()
export class UsersMapper {
  @Inject(DepartmentsService)
  private readonly departmentsService!: DepartmentsService;

  async toDto(user: User): Promise<UserDto> {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
      title: user.title,
      departmentId: user.departmentId,
      departmentName: (await this.departmentsService.Get(user.departmentId))
        .name,
    };
  }

  async toDtos(users: User[]): Promise<UserDto[]> {
    return await Promise.all(users.map((user) => this.toDto(user)));
  }
}
