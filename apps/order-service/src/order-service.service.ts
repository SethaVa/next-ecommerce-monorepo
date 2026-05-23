import { Injectable } from '@nestjs/common';
import { PrismaService } from 'y/database';
import { CreateOrderPayload } from 'y/events';

@Injectable()
export class OrderServiceService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async create(payload: CreateOrderPayload) {
    const total = payload.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return this.prisma.order.create({
      data: {
        userId: payload.userId,
        total,
        items: {
          create: payload.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: { items: true },
    });
  }
}
