import { Controller, Get } from '@nestjs/common';
import { OrderServiceService } from './order-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderPayload, ORDER_PATTERNS } from 'y/events';

@Controller()
export class OrderServiceController {
  constructor(private readonly orderServiceService: OrderServiceService) {}

  @Get()
  getHello(): string {
    return this.orderServiceService.getHello();
  }

  @MessagePattern(ORDER_PATTERNS.CREATE)
  create(@Payload() payload: CreateOrderPayload) {
    return this.orderServiceService.create(payload);
  }

  @MessagePattern(ORDER_PATTERNS.GET_ALL)
  findAll() {
    return this.orderServiceService.findAll();
  }
}
