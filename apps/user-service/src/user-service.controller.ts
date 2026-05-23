import { Controller, Get } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserPayload, USER_PATTERNS } from 'y/events';

@Controller()
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @Get()
  getHello(): string {
    return this.userServiceService.getHello();
  }

  @MessagePattern(USER_PATTERNS.CREATE)
  async create(@Payload() payload: CreateUserPayload) {
    console.log('payload', payload);
    return await this.userServiceService.create(payload);
  }

  @MessagePattern(USER_PATTERNS.GET_ONE)
  async findOne(@Payload() id: string) {
    return await this.userServiceService.findOne(id);
  }

  @MessagePattern(USER_PATTERNS.GET_ALL)
  async findAll() {
    return await this.userServiceService.findAll();
  }

  @MessagePattern(USER_PATTERNS.VALIDATE)
  async validate(@Payload() payload: { email: string; password: string }) {
    return await this.userServiceService.validate(payload);
  }
}
