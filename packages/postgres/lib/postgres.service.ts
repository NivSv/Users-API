import {
    Injectable,
    OnModuleInit,
    OnModuleDestroy,
    Inject,
} from '@nestjs/common'
import { Pool, PoolClient } from 'pg'
import { POSTGRES_MODULE_OPTIONS } from './postgres.constants'
import { PostgresModuleOptions } from './postgres.interface'

@Injectable()
export class PostgresService implements OnModuleInit, OnModuleDestroy {
    private pool: Pool

    constructor(
        @Inject(POSTGRES_MODULE_OPTIONS)
        private readonly options: PostgresModuleOptions
    ) {
        this.pool = new Pool({
            host: options.host,
            port: options.port,
            user: options.username,
            password: options.password,
            database: options.database,
            ssl: options.ssl,
        })
    }

    async onModuleDestroy(): Promise<void> {
        await this.pool.end()
    }

    async onModuleInit(): Promise<void> {
        await this.pool.connect()
    }

    async getClient(): Promise<PoolClient> {
        return this.pool.connect()
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
    async query<QueryResponse extends any = any>(
        query: string,
        params?: any[]
    ): Promise<Array<QueryResponse>> {
        const client = await this.getClient()
        try {
            const result = await client.query<QueryResponse>(query, params)
            return result.rows
        } finally {
            client.release()
        }
    }
}
