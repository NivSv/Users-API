import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const FindFilterSchema = z.object({
  firstName: z.string().min(2).optional().describe('First Name'),
  lastName: z.string().min(2).optional().describe('Last Name'),
  title: z.string().optional().describe('Title'),
  email: z.string().email().optional().describe('Email'),
  image: z.string().url().optional().describe('Image'),
  department: z.string().optional().describe('Department'),
});

export class FindFiltersDto extends createZodDto(FindFilterSchema) {}
