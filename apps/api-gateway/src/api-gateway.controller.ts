import { Body, Controller, Get, Inject, OnModuleInit, Param, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { SERVICES } from 'y/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderPayload, CreateUserPayload } from 'y/events/payloads';
import { ORDER_PATTERNS, USER_PATTERNS } from 'y/events';
import { firstValueFrom, timeout } from 'rxjs';

@Controller()
export class ApiGatewayController implements OnModuleInit {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    @Inject(SERVICES.USER) private readonly userClient: ClientProxy,
    @Inject(SERVICES.ORDER) private readonly orderClient: ClientProxy,
  ) {}

  // ✅ Eagerly connect on startup instead of lazy first-message connect
  async onModuleInit() {
    await this.userClient.connect();
    await this.orderClient.connect();
  }

  @Get()
  getHello(): string {
    return this.apiGatewayService.getHello();
  }

  // ── Users ──────────────────────────────
  @Post('users')
  createUser(@Body() payload: CreateUserPayload) {
    return this.userClient.send(USER_PATTERNS.CREATE, payload);
  }

  @Get('users/:id')
  getUser(@Param('id') id: string) {
    return this.userClient.send(USER_PATTERNS.GET_ONE, id);
  }

  @Get('users')
  getUsers() {
    return this.userClient.send(USER_PATTERNS.GET_ALL, {});
  }

  // ── Orders ─────────────────────────────
  @Post('orders')
  createOrder(@Body() payload: CreateOrderPayload) {
    return this.orderClient.send(ORDER_PATTERNS.CREATE, payload);
  }

  @Get('orders')
  getOrders() {
    return firstValueFrom(this.orderClient.send(ORDER_PATTERNS.GET_ALL, {}).pipe(timeout(5000)));
  }
}
