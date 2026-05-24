import {
  Controller,
  Post,
  Body,
  Inject,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom, timeout } from 'rxjs';
import { Public } from './decorators/public.decorator';
import { SERVICES } from 'y/common';
import { USER_PATTERNS } from 'y/events';
import { LoginPayload, RegisterPayload } from 'y/events/payloads';
import bcrypt from 'bcryptjs';
import { UserResponse } from 'y/events/payloads';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(SERVICES.USER) private readonly userClient: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() payload: RegisterPayload) {
    try {
      const hashedPassword = await bcrypt.hash(payload.password, 10);

      console.log('Registering user with email:', payload.email);
      const user = await firstValueFrom<UserResponse>(
        this.userClient
          .send(USER_PATTERNS.CREATE, {
            ...payload,
            password: hashedPassword,
          })
          .pipe(timeout(5000)),
      );

      console.log('Received user from User Service:', user);
      if (!user) {
        throw new Error('Registration failed');
      }

      const token = this.jwtService.sign({ sub: user.id, email: user.email });

      return { user, token };
    } catch (error: unknown) {
      if (error instanceof BadRequestException) throw error;
      if (error instanceof Error) throw new BadRequestException(error.message);
      throw new BadRequestException('Registration failed');
    }
  }

  @Public()
  @Post('login')
  async login(@Body() payload: LoginPayload) {
    try {
      const user = await firstValueFrom<UserResponse>(
        this.userClient.send(USER_PATTERNS.VALIDATE, { email: payload.email }).pipe(timeout(5000)),
      );

      if (!user) throw new UnauthorizedException('Invalid credentials');

      const isPasswordValid = await bcrypt.compare(payload.password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const token = this.jwtService.sign({ sub: user.id, email: user.email });

      return { user, token };
    } catch (error: unknown) {
      if (error instanceof UnauthorizedException) throw error;
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
