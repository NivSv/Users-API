import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const DepartmentSchema = z.object({
  id: z.number().describe('Id'),
  name: z.string().min(2).describe('Name'),
  description: z.string().optional().describe('Description'),
  users: z.array(z.number()).optional().describe('Users'),
  createdAt: z.date().describe('Created At'),
});

export class DepartmentDto extends createZodDto(DepartmentSchema) {}
