import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.NODE_ENV || 3000);
  Logger.log(`********************************`);
  Logger.log(`Backend is running in ${process.env.NODE_ENV} mode`);
  Logger.log(`server listen on port ${process.env.BACKEND_PORT}`);
  Logger.log(`********************************`);
}
bootstrap();
