import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3004;

  await app.listen(PORT)
  console.log(`Application is running on port ${PORT}`);
}
bootstrap();
