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
  create(@Payload() payload: CreateUserPayload) {
    return this.userServiceService.create(payload);
  }

  @MessagePattern(USER_PATTERNS.GET_ONE)
  findOne(@Payload() id: string) {
    return this.userServiceService.findOne(id);
  }

  @MessagePattern(USER_PATTERNS.GET_ALL)
  findAll() {
    return this.userServiceService.findAll();
  }

  @MessagePattern(USER_PATTERNS.VALIDATE)
  validate(@Payload() payload: { email: string; password: string }) {
    return this.userServiceService.validate(payload);
  }
}
