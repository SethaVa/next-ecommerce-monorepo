import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { QUEUES } from 'y/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserServiceModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
      queue: QUEUES.USER,
      queueOptions: { durable: true },
    },
  });
  await app.listen();
  console.log('User Service is listening on RabbitMQ...');
}
void bootstrap();
