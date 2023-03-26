import { departmentStub } from '../stubs/department.stub'

export const DepartmentsService = jest.fn().mockReturnValue({
    Get: jest.fn().mockResolvedValue(departmentStub),
    GetByName: jest.fn().mockResolvedValue(departmentStub),
    GetAll: jest.fn().mockResolvedValue([departmentStub]),
    Create: jest.fn().mockResolvedValue(departmentStub),
    Update: jest.fn().mockResolvedValue(departmentStub),
    Delete: jest.fn().mockResolvedValue(void 0),
})
