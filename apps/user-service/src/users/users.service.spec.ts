import { Test, TestingModule } from '@nestjs/testing'
import { PostgresService } from '@niv/postgres'
import { INTERNAL_SERVER_ERROR_TEXT } from '../errors.constants'
import { userStub } from './stubs/user.stub'
import { UsersService } from './users.service'

describe('UsersService', () => {
    let userService: UsersService

    const monkPostgresService = {
        query: jest.fn().mockResolvedValue([userStub]),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                { provide: PostgresService, useValue: monkPostgresService },
            ],
        }).compile()

        userService = module.get<UsersService>(UsersService)
        jest.restoreAllMocks()
    })

    it('should be defined', () => {
        expect(userService).toBeDefined()
    })

    describe('Get', () => {
        it('should return a user', async () => {
            const user = await userService.Get(1)
            expect(user).toEqual(userStub)
        })

        it('should return null if user does not exist', async () => {
            monkPostgresService.query.mockResolvedValue(null)
            expect(await userService.Get(2)).toBeNull()
        })
    })

    describe('GetAll', () => {
        it('should return a list of users', async () => {
            monkPostgresService.query.mockResolvedValue([userStub])
            const users = await userService.GetAll({})
            expect(users).toEqual([userStub])
        })

        it('should return an empty list if no users exist', async () => {
            monkPostgresService.query.mockResolvedValue([])
            const users = await userService.GetAll({})
            expect(users).toEqual([])
        })
    })

    describe('Create', () => {
        it('should create a new user and return it', async () => {
            monkPostgresService.query.mockResolvedValue([userStub])
            const createdUser = await userService.Create(userStub, {
                id: userStub.department_id,
                name: 'Marketing',
            })
            expect(createdUser).toEqual(userStub)
        })

        it('should throw an error if creation was not success', async () => {
            monkPostgresService.query.mockRejectedValue(
                new Error('This is a test error :)')
            )
            expect(
                userService.Create(userStub, {
                    id: 2,
                    name: 'Sales',
                })
            ).rejects.toThrowError(INTERNAL_SERVER_ERROR_TEXT)
        })
    })

    describe('Update', () => {
        it('should update a user and return the updated user', async () => {
            monkPostgresService.query.mockResolvedValue([userStub])
            const user = await userService.Update(userStub, userStub, {
                id: userStub.department_id,
                name: 'Engineering',
            })
            expect(user).toEqual(userStub)
        })

        it('should throw an error if updating was not success', async () => {
            monkPostgresService.query.mockRejectedValue(
                new Error('This is a test error :)')
            )
            expect(
                userService.Create(userStub, {
                    id: 2,
                    name: 'Sales',
                })
            ).rejects.toThrowError(INTERNAL_SERVER_ERROR_TEXT)
        })
    })
})
