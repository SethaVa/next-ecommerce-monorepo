import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

export interface RabbitMQModuleOptions {
  name: string;
  queue: string;
}

@Module({})
export class RabbitMQModule {
  static register({ name, queue }: RabbitMQModuleOptions): DynamicModule {
    return {
      module: RabbitMQModule,
      imports: [
        ClientsModule.register([
          {
            name,
            transport: Transport.RMQ,
            options: {
              urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
              queue,
              queueOptions: { durable: true },
              socketOptions: {
                heartbeatIntervalInSeconds: 60,
                reconnectTimeInSeconds: 5, // ✅ retry every 5s if disconnected
              },
              prefetchCount: 1,
            },
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
