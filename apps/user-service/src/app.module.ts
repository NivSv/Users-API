import { Module } from '@nestjs/common'
import { ZodValidationPipe } from 'nestjs-zod'
import { APP_PIPE } from '@nestjs/core'
import { DepartmentsModule } from './departments/departments.module'
import { ConfigModule } from './config/config.module'
import { UsersModule } from './users/users.module'
import { HealthModule } from '@niv/health'

@Module({
    imports: [ConfigModule, DepartmentsModule, UsersModule, HealthModule],
    controllers: [],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ZodValidationPipe,
        },
    ],
})
export class AppModule {}
