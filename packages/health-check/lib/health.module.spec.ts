import { Test } from '@nestjs/testing'
import { HealthController } from './health.controller'
import { HealthModule } from './health.module'

describe('HealthModule', () => {
    it('should compile the module', async () => {
        const module = await Test.createTestingModule({
            imports: [HealthModule],
        }).compile()

        expect(module).toBeDefined()
        expect(module.get(HealthController)).toBeInstanceOf(HealthController)
    })
})
