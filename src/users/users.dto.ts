import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const UserSchema = z.object({
  id: z.number().describe('Id'),
  firstName: z.string().min(2).describe('First Name'),
  lastName: z.string().min(2).describe('Last Name'),
  title: z.string().describe('Title'),
  email: z.string().email().describe('Email'),
  image: z.string().describe('Image'),
  departmentId: z.number().describe('Department Id'),
  departmentName: z.string().describe('Department Name'),
  createdAt: z.date().describe('Created At'),
});

export class UserDto extends createZodDto(UserSchema) {}
