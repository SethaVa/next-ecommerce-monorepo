import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { RabbitMQModule, SERVICES, QUEUES } from 'y/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'it_is_hard_to_earn_money_in_covid_times',
      signOptions: { expiresIn: '7d' },
    }),
    RabbitMQModule.register({ name: SERVICES.USER, queue: QUEUES.USER }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
