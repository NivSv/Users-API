import { Department } from '@prisma/client';

export const DepartmentsSeed: Array<Partial<Department>> = [
  {
    name: 'R&D',
    description: 'Research and Development',
  },
  {
    name: 'IT',
    description: 'Information Technology',
  },
  {
    name: 'HR',
    description: 'Human Resources',
  },
];
