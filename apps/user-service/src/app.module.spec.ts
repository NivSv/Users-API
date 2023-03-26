import { Test } from '@nestjs/testing'
import { AppModule } from './app.module'
import { ConfigModule } from './config/config.module'
import { DepartmentsModule } from './departments/departments.module'
import { UsersModule } from './users/users.module'

describe('AppModule', () => {
    it('should compile the module', async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        expect(module).toBeDefined()
        expect(module.get(ConfigModule)).toBeInstanceOf(ConfigModule)
        expect(module.get(DepartmentsModule)).toBeInstanceOf(DepartmentsModule)
        expect(module.get(UsersModule)).toBeInstanceOf(UsersModule)
    })
})
