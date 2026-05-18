import { NestFactory } from '@nestjs/core';
import { PaymentServiceModule } from './payment-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { QUEUES } from 'y/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(PaymentServiceModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
      queue: QUEUES.PAYMENT,
      queueOptions: { durable: true },
    },
  });
  await app.listen();
}

void bootstrap();
