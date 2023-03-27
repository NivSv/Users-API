import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

const UserSchema = z.object({
    id: z.number().describe('Id'),
    firstName: z.string().min(2).describe('First Name'),
    lastName: z.string().min(2).describe('Last Name'),
    title: z.string().optional().describe('Title'),
    email: z.string().email().describe('Email'),
    image: z.string().optional().describe('Image'),
    departmentId: z.number().describe('Department Id'),
    departmentName: z.string().describe('Department Name'),
})

export class UserDto extends createZodDto(UserSchema) {}
