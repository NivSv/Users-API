import { Test, TestingModule } from '@nestjs/testing'
import { DepartmentsController } from './departments.controller'
import { DepartmentsMapper } from './departments.mapper'
import { DepartmentsService } from './departments.service'

describe('DepartmentsController', () => {
    let controller: DepartmentsController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DepartmentsController],
            providers: [
                {
                    provide: DepartmentsService,
                    useValue: {},
                },
                {
                    provide: DepartmentsMapper,
                    useValue: {},
                },
            ],
        }).compile()

        controller = module.get<DepartmentsController>(DepartmentsController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
