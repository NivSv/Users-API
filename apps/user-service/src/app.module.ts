import { Module } from '@nestjs/common'
import { HealthController } from './health/health.controller'
import { ZodValidationPipe } from 'nestjs-zod'
import { APP_PIPE } from '@nestjs/core'
import { DepartmentsModule } from './departments/departments.module'
import { ConfigModule } from './config/config.module'
import { UsersModule } from './users/users.module'

@Module({
    imports: [ConfigModule, DepartmentsModule, UsersModule],
    controllers: [HealthController],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ZodValidationPipe,
        },
    ],
})
export class AppModule {}
