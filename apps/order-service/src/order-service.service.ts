import { Injectable } from '@nestjs/common';
import { CreateOrderPayload } from 'y/events';

@Injectable()
export class OrderServiceService {
  getHello(): string {
    return 'Hello World!';
  }

  create(payload: CreateOrderPayload) {
    return {
      id: 'order123',
      userId: payload.userId,
      items: payload.items,
      total: payload.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'created',
    };
  }

  findOne(id: string) {
    return {
      id,
      userId: 'user123',
      items: [],
      total: 0,
      status: 'created',
    };
  }

  private orders = ['Test Order']; // temporary in-memory store
  findAll() {
    return this.orders; // ✅ must return something, even empty array
  }
}
