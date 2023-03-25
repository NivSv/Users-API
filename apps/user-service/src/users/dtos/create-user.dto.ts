import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateUserSchema = z.object({
  firstName: z.string().min(2).describe('First Name'),
  lastName: z.string().min(2).describe('Last Name'),
  title: z.string().optional().describe('Title'),
  email: z.string().email().describe('Email'),
  image: z.string().url().optional().describe('Image'),
  department: z.string().describe('Department'),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
