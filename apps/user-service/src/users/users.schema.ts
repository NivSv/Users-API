import { z } from 'nestjs-zod/z';

export const userSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  title: z.string(),
  email: z.string(),
  image: z.string(),
  department_id: z.number(),
});

export type User = z.infer<typeof userSchema>;
