import { NestFactory } from '@nestjs/core';
import { ShippingServiceModule } from './shipping-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ShippingServiceModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: parseInt(process.env.PORT ?? '3007'),
    },
  });
  await app.listen();
}
bootstrap();
