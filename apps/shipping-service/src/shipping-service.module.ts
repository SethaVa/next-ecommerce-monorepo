import { Module } from '@nestjs/common';
import { ShippingServiceController } from './shipping-service.controller';
import { ShippingServiceService } from './shipping-service.service';
import { DatabaseModule } from 'y/database';

@Module({
  imports: [DatabaseModule],
  controllers: [ShippingServiceController],
  providers: [ShippingServiceService],
})
export class ShippingServiceModule {}
