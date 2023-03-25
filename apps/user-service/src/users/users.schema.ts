import { z } from 'nestjs-zod/z';

export const userSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  title: z.string(),
  email: z.string(),
  image: z.string(),
  departmentId: z.number(),
});

export type User = z.infer<typeof userSchema>;
