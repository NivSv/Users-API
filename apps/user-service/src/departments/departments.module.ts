import { Module } from '@nestjs/common'
import { PostgresModule } from '@niv/postgres'
import { ConfigService } from '../config/config.service'
import { UsersService } from '../users/users.service'
import { DepartmentsController } from './departments.controller'
import { DepartmentsMapper } from './departments.mapper'
import { DepartmentsService } from './departments.service'

const configService = new ConfigService()

@Module({
    imports: [
        PostgresModule.forRoot({
            host: configService.postgresHost,
            port: configService.postgresPort,
            username: configService.postgresUser,
            password: configService.postgresPassword,
            database: configService.postgresDb,
        }),
    ],
    controllers: [DepartmentsController],
    providers: [DepartmentsService, DepartmentsMapper, UsersService],
})
export class DepartmentsModule {}
