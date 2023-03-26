import { z } from 'nestjs-zod/z'

export const departmentSchema = z.object({
    id: z.number(),
    name: z.string().min(2),
    description: z.string().optional(),
    user_count: z.number(),
})

export type Department = z.infer<typeof departmentSchema>
