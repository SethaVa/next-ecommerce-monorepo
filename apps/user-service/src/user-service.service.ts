import { Injectable } from '@nestjs/common';
import { CreateUserPayload } from 'y/events/payloads';

@Injectable()
export class UserServiceService {
  getHello(): string {
    return 'Hello World!';
  }

  create(payload: CreateUserPayload) {
    return {
      id: '123',
      email: payload.email,
      name: payload.name,
    };
  }

  findOne(id: string) {
    return {
      id,
      email: 'example@example.com',
    };
  }

  findAll() {
    return ['Test User'];
  }

  validate(payload: { email: string; password: string }) {
    return payload.email === 'example@example.com' && payload.password === 'password123';
  }
}
