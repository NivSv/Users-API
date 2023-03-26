import { Injectable } from '@nestjs/common'
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import { z } from 'nestjs-zod/z'

@Injectable()
export class ConfigService {
    private envCache: NodeJS.ProcessEnv

    constructor() {
        expand(config())
        this.envCache = process.env

        const environmentVariablesSchema = z.object({
            port: z.number().or(z.string()),
            postgresHost: z.string(),
            postgresPort: z.number(),
            postgresUser: z.string(),
            postgresPassword: z.string(),
            postgresDb: z.string(),
            postgresSecure: z.boolean(),
        })

        environmentVariablesSchema.parse(this)
    }

    get port(): number | string {
        return this.envCache.PORT ?? 8080
    }

    get postgresHost(): string {
        return this.envCache.POSTGRES_HOST
    }

    get postgresPort(): number {
        return Number(this.envCache.POSTGRES_PORT)
    }

    get postgresUser(): string {
        return this.envCache.POSTGRES_USER
    }

    get postgresPassword(): string {
        return this.envCache.POSTGRES_PASSWORD
    }

    get postgresDb(): string {
        return this.envCache.POSTGRES_DB
    }

    get postgresSecure(): boolean {
        return this.envCache.POSTGRES_SECURE != null
            ? this.envCache.POSTGRES_SECURE.toLowerCase() == 'true'
            : true
    }
}
