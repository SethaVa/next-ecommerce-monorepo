import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { QUEUES, RabbitMQModule, SERVICES } from 'y/common';
import { ApiGatewayService } from './api-gateway.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    RabbitMQModule.register({ name: SERVICES.USER, queue: QUEUES.USER }),
    RabbitMQModule.register({ name: SERVICES.ORDER, queue: QUEUES.ORDER }),
    RabbitMQModule.register({ name: SERVICES.CATALOG, queue: QUEUES.CATALOG }),
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
