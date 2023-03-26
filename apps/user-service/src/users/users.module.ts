import { Module } from '@nestjs/common'
import { PostgresModule } from '@niv/postgres'
import { ConfigService } from '../config/config.service'
import { DepartmentsService } from '../departments/departments.service'
import { UsersController } from './users.controller'
import { UsersMapper } from './users.mapper'
import { UsersService } from './users.service'

const configService = new ConfigService()

@Module({
    imports: [
        PostgresModule.forRoot({
            host: configService.postgresHost,
            port: configService.postgresPort,
            username: configService.postgresUser,
            password: configService.postgresPassword,
            database: configService.postgresDb,
            ssl: configService.postgresSecure,
        }),
    ],
    controllers: [UsersController],
    providers: [UsersService, DepartmentsService, UsersMapper],
})
export class UsersModule {}
