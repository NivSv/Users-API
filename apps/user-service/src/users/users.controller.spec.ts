import { BadRequestException, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { DepartmentsService } from '../departments/departments.service'
import { departmentStub } from '../departments/stubs/department.stub'
import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { userDtoStub } from './stubs/user-dto.stub'
import { userStub } from './stubs/user.stub'
import { UsersController } from './users.controller'
import { UsersMapper } from './users.mapper'
import { UsersService } from './users.service'

jest.mock('./users.service')
jest.mock('../departments/departments.service')
jest.mock('./users.mapper')

describe('UsersController', () => {
    let controller: UsersController
    let departmentsService: DepartmentsService
    let usersService: UsersService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService, DepartmentsService, UsersMapper],
        }).compile()

        usersService = module.get<UsersService>(UsersService)
        departmentsService = module.get<DepartmentsService>(DepartmentsService)
        controller = module.get<UsersController>(UsersController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    it('should be defined', () => {
        expect(departmentsService).toBeDefined()
    })

    describe('create', () => {
        it('should create a user', async () => {
            const createUserDto: CreateUserDto = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'niv@gmail.com',
                image: 'https://example.com/image.png',
                title: 'Software Engineer',
                department: 'Marketing',
            }
            const result = await controller.create(createUserDto)
            expect(result).toEqual(userDtoStub)
        })

        it('should throw a NotFoundException if department does not exist', async () => {
            const createUserDto: CreateUserDto = {
                firstName: 'John',
                lastName: 'Doe',
                title: 'Software Engineer',
                email: 'john.doe@example.com',
                image: 'https://example.com/avatar.jpg',
                department: 'Unknown Department',
            }
            jest.spyOn(departmentsService, 'GetByName').mockResolvedValue(null)

            await expect(controller.create(createUserDto)).rejects.toThrowError(
                NotFoundException
            )
            expect(departmentsService.GetByName).toHaveBeenCalledWith(
                createUserDto.department
            )
        })
    })

    describe('findAll', () => {
        it('should return an array of UserDto', async () => {
            expect(await controller.findAll({})).toEqual([userDtoStub])
        })
    })

    describe('findOne', () => {
        it('should return a UserDto when given a valid id', async () => {
            const result = await controller.findOne('1')
            expect(result).toEqual(userDtoStub)
        })

        it('should throw a BadRequestException when given an empty id', async () => {
            await expect(controller.findOne('')).rejects.toThrow(
                BadRequestException
            )
        })

        it('should throw a NotFoundException when given a non-existent id', async () => {
            jest.spyOn(usersService, 'Get').mockImplementation(() =>
                Promise.resolve(null)
            )

            await expect(controller.findOne('1')).rejects.toThrow(
                NotFoundException
            )
        })
    })

    describe('update', () => {
        const updateUserDtoStub: UpdateUserDto = {
            id: 1,
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'www.google.com',
            image: 'https://example.com/image.png',
            title: 'Software Engineer',
            department: 'Marketing',
        }
        it('should update a user', async () => {
            jest.spyOn(usersService, 'Get').mockResolvedValueOnce(userStub)
            jest.spyOn(departmentsService, 'GetByName').mockResolvedValueOnce(
                departmentStub
            )
            jest.spyOn(usersService, 'Update').mockResolvedValueOnce(userStub)
            const result = await controller.update(updateUserDtoStub)
            expect(result).toEqual(userDtoStub)
        })

        it('should throw NotFoundException if user is not found', async () => {
            jest.spyOn(usersService, 'Get').mockResolvedValueOnce(null)

            await expect(controller.update(updateUserDtoStub)).rejects.toThrow(
                NotFoundException
            )
            expect(usersService.Get).toHaveBeenCalledWith(updateUserDtoStub.id)
        })

        it('should throw a NotFoundException if department does not exist', async () => {
            jest.spyOn(departmentsService, 'GetByName').mockResolvedValue(null)

            await expect(controller.update(updateUserDtoStub)).rejects.toThrow(
                NotFoundException
            )
            expect(departmentsService.GetByName).toHaveBeenCalledWith(
                updateUserDtoStub.department
            )
        })
    })

    describe('delete', () => {
        it('should delete user', async () => {
            jest.spyOn(usersService, 'Get').mockResolvedValueOnce(userStub)
            jest.spyOn(usersService, 'Delete').mockResolvedValueOnce(undefined)

            await controller.delete(userStub.id.toString())

            expect(usersService.Get).toHaveBeenCalledWith(
                parseInt(userStub.id.toString())
            )
            expect(usersService.Delete).toHaveBeenCalledWith(userStub)
        })

        it('should throw NotFoundException if user is not found', async () => {
            jest.spyOn(usersService, 'Get').mockResolvedValueOnce(undefined)

            await expect(
                controller.delete(userStub.id.toString())
            ).rejects.toThrow(NotFoundException)
        })

        it('should throw BadRequestException if id is not provided', async () => {
            await expect(controller.delete('')).rejects.toThrow(
                BadRequestException
            )
        })
    })
})
