import { NestFactory } from '@nestjs/core';
import { InventoryServiceModule } from './inventory-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { QUEUES } from 'y/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(InventoryServiceModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
      queue: QUEUES.INVENTORY,
      queueOptions: { durable: true },
    },
  });
  await app.listen();
}
void bootstrap();
