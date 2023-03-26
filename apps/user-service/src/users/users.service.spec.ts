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
            monkPostgresService.query.mockResolvedValue([])
            expect(await userService.Get(2)).toBeNull()
        })
    })

    describe('GetAll', () => {
        it('should return a list of users', async () => {
            monkPostgresService.query.mockResolvedValue([userStub])
            const users = await userService.GetAll({})
            console.log({ users })

            expect(users).toEqual([userStub])
        })

        it('should return an empty list if no users exist', async () => {
            monkPostgresService.query.mockResolvedValue([])
            const users = await userService.GetAll({})
            expect(users).toEqual([])
        })
    })

    // describe('Create', () => {
    //     beforeEach(() => {
    //         monkPostgresService.query.mockRestore()
    //     })

    //     it('should create a user', async () => {
    //         const user = await userService.Create(userStub, {
    //             id: userStub.department_id,
    //             name: 'Marketing',
    //         })
    //         expect(user).toEqual(userStub)
    //     })

    //     it('should throw an error if creation was not success', async () => {
    //         monkPostgresService.query.mockRejectedValue(new Error('Error'))
    //         expect(
    //             userService.Create(userStub, {
    //                 id: 2,
    //                 name: 'Sales',
    //             })
    //         ).rejects.toThrowError(INTERNAL_SERVER_ERROR_TEXT)
    //     })
    // })

    //     describe('Update', () => {
    //         it('should update a user', async () => {
    //             const updatedUser = {
    //                 ...userStub,
    //                 name: 'Updated Name',
    //             }
    //             const user = await userService.Update(userStub, updatedUser, {
    //                 id: userStub.department_id,
    //                 name: 'Engineering',
    //             })
    //             expect(user).toMatchObject(updatedUser)
    //         })

    //         it('should throw an error if user does not exist', async () => {
    //             monkPostgresService.query.mockResolvedValue([])
    //             expect(
    //                 userService.Update(
    //                     userStub,
    //                     {
    //                         ...userStub,
    //                         firstName: 'Updated Name',
    //                     },
    //                     {
    //                         id: userStub.department_id,
    //                         name: 'Engineering',
    //                     }
    //                 )
    //             ).rejects.toThrowError('User not found')
    //         })

    //         it('should throw an error if department does not exist', async () => {
    //             expect(
    //                 userService.Update(
    //                     userStub,
    //                     {
    //                         ...userStub,
    //                         firstName: 'Updated Name',
    //                     },
    //                     {
    //                         id: 2,
    //                         name: 'Sales',
    //                     }
    //                 )
    //             ).rejects.toThrowError('Department not found')
    //         })
    //     })
})
