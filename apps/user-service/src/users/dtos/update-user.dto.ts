import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const UpdateUserSchema = z.object({
  id: z.number(),
  firstName: z.string().min(2).describe('First Name'),
  lastName: z.string().min(2).describe('Last Name'),
  title: z.string().optional().describe('Title'),
  image: z.string().url().optional().describe('Image'),
  email: z.string().email().describe('Email'),
  department: z.string().describe('Department'),
});

export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}
