import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { patchNestJsSwagger } from 'nestjs-zod'
import { ConfigService } from './config/config.service'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService)
    //cors
    const options = {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        optionsSuccessStatus: 204,
    }
    app.enableCors(options)
    //swagger
    patchNestJsSwagger()
    const config = new DocumentBuilder()
        .setTitle('Users API')
        .setDescription('The users API description')
        .setVersion('1.0')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

    await app.listen(configService.port)
    Logger.log(`********************************`)
    Logger.log(`Backend is running in ${process.env.NODE_ENV} mode`)
    Logger.log(`server listen on port ${configService.port || 3000}`)
    Logger.log(`********************************`)
}
bootstrap()
