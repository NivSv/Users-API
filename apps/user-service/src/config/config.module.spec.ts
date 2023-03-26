import { Test } from '@nestjs/testing'
import { ConfigModule } from './config.module'
import { ConfigService } from './config.service'

describe('ConfigModule', () => {
    it('should compile the module', async () => {
        const module = await Test.createTestingModule({
            imports: [ConfigModule],
        }).compile()

        expect(module).toBeDefined()
        expect(module.get(ConfigService)).toBeInstanceOf(ConfigService)
    })
})
