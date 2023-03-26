declare namespace NodeJS {
    export interface ProcessEnv {
        PORT?: number
        POSTGRES_HOST: string
        POSTGRES_PORT: number
        POSTGRES_USER: string
        POSTGRES_PASSWORD: string
        POSTGRES_DB: string
    }
}
