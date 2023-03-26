import { userDtoStub } from '../stubs/user-dto.stub'

export const UsersMapper = jest.fn().mockReturnValue({
    toDto: jest.fn().mockResolvedValue(userDtoStub),
    toDtos: jest.fn().mockResolvedValue([userDtoStub]),
})
