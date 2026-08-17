import { NestFactory } from '@nestjs/core';
import { WorkersModule } from './workers.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Workers');

  // Workers app doesn't serve HTTP — it just processes BullMQ jobs.
  // NestFactory.createApplicationContext is the correct bootstrapper for this.
  const app = await NestFactory.createApplicationContext(WorkersModule);

  logger.log('🔧 Workers application started — processing background jobs');

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    logger.log('SIGTERM received — shutting down workers gracefully');
    await app.close();
    process.exit(0);
  });
}
bootstrap();
