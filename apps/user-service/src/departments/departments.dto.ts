import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

const DepartmentSchema = z.object({
    id: z.number().describe('Id'),
    name: z.string().min(2).describe('Name'),
    description: z.string().optional().describe('Description'),
    userCount: z.number().optional().describe('User count'),
})

export class DepartmentDto extends createZodDto(DepartmentSchema) {}
