import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 8000;
  const logger = new Logger('Bootstrap');

  await app.listen(PORT, () => {
    logger.log(`Server is running on http://localhost:${PORT}`);
  });
}
bootstrap();
