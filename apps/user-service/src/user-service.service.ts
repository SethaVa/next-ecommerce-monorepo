import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserPayload } from 'y/events/payloads';
import { PrismaService } from 'y/database';

@Injectable()
export class UserServiceService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async create(payload: CreateUserPayload) {
    return await this.prisma.user.create({
      data: {
        email: payload.email,
        password: payload.password, // hash this in production!
        name: payload.name,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async validate(payload: { email: string; password: string }) {
    return await this.prisma.user.findUnique({
      where: { email: payload.email },
    });
  }
}
