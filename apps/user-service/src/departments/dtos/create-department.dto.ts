import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

const CreateDepartmentSchema = z.object({
    name: z.string().min(2).describe('Name'),
    description: z.string().optional().describe('Description'),
})

export class CreateDepartmentDto extends createZodDto(CreateDepartmentSchema) {}
