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

export const UsersNumberSeed = 10;

const RnDTitles = [
  'Software Engineer',
  'Software Developer',
  'Software Architect',
];

const ITTitles = ['IT Manager', 'IT Support', 'IT Technician'];

const HRTitles = ['HR Manager', 'HR Specialist', 'HR Recruiter'];

export const Titles = {
  'R&D': RnDTitles,
  IT: ITTitles,
  HR: HRTitles,
};
