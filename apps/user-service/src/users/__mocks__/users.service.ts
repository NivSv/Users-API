import { userStub } from '../stubs/user.stub'

export const UsersService = jest.fn().mockReturnValue({
    Get: jest.fn().mockResolvedValue(userStub),
    GetAll: jest.fn().mockResolvedValue([userStub]),
    GetAllByDepartmentId: jest.fn().mockResolvedValue([userStub]),
    Create: jest.fn().mockResolvedValue(userStub),
    Update: jest.fn().mockResolvedValue(userStub),
    Delete: jest.fn().mockResolvedValue(void 0),
})
