import { NestFactory } from '@nestjs/core';
import { ValidatingPipe } from 'nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidatingPipe());
  await app.listen(3000);
}
bootstrap();
