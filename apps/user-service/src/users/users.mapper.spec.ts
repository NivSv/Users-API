import { Test, TestingModule } from '@nestjs/testing'
import { DepartmentsService } from '../departments/departments.service'
import { departmentStub } from '../departments/stubs/department.stub'
import { userStub } from './stubs/user.stub'
import { UserDto } from './users.dto'
import { UsersMapper } from './users.mapper'

jest.mock('../departments/departments.service')

describe('UsersMapper', () => {
    let usersMapper: UsersMapper

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersMapper, DepartmentsService],
        }).compile()

        usersMapper = module.get<UsersMapper>(UsersMapper)
        jest.clearAllMocks()
    })

    it('should be defined', () => {
        expect(usersMapper).toBeDefined()
    })

    describe('toDto', () => {
        it('should map user to user DTO', async () => {
            const userDto: UserDto = await usersMapper.toDto(userStub)

            expect(userDto).toBeDefined()
            expect(userDto.id).toEqual(userStub.id)
            expect(userDto.firstName).toEqual(userStub.first_name)
            expect(userDto.lastName).toEqual(userStub.last_name)
            expect(userDto.email).toEqual(userStub.email)
            expect(userDto.image).toEqual(userStub.image)
            expect(userDto.title).toEqual(userStub.title)
            expect(userDto.departmentId).toEqual(userStub.department_id)
        })
    })

    describe('toDtos', () => {
        it('should map users to user DTOs', async () => {
            const userDtos: UserDto[] = await usersMapper.toDtos([userStub])

            expect(userDtos).toBeDefined()
            expect(userDtos.length).toEqual(1)
            expect(userDtos[0].id).toEqual(userStub.id)
            expect(userDtos[0].firstName).toEqual(userStub.first_name)
            expect(userDtos[0].lastName).toEqual(userStub.last_name)
            expect(userDtos[0].email).toEqual(userStub.email)
            expect(userDtos[0].image).toEqual(userStub.image)
            expect(userDtos[0].title).toEqual(userStub.title)
            expect(userDtos[0].departmentId).toEqual(userStub.department_id)
        })
    })
})
