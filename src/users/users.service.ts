import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  @Inject(PrismaService) private readonly prisma!: PrismaService;

  //   async create(createUserDto: CreateUserDto) {
  //     return this.prisma.user.create({
  //       data: {
  //         firstName: createUserDto.firstName,
  //         lastName: createUserDto.lastName,
  //         title: createUserDto.title,
  //         email: createUserDto.email,
  //         image: createUserDto.image,
  //         department: 0,
  //       },
  //     });
  //   }
}
