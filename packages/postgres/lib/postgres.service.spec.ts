import { Test, TestingModule } from '@nestjs/testing'
import { POSTGRES_MODULE_OPTIONS } from './postgres.constants'
import { PostgresService } from './postgres.service'

describe('PostgresService', () => {
    let service: PostgresService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PostgresService,
                { provide: POSTGRES_MODULE_OPTIONS, useValue: {} },
            ],
        }).compile()

        service = module.get<PostgresService>(PostgresService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
