import { NestFactory } from '@nestjs/core';
import { CatalogServiceModule } from './catalog-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { QUEUES } from 'y/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CatalogServiceModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
      queue: QUEUES.CATALOG,
      queueOptions: { durable: true },
    },
  });
  await app.listen();
}
void bootstrap();
