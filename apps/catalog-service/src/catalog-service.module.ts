import { Module } from '@nestjs/common';
import { CatalogServiceController } from './catalog-service.controller';
import { CatalogServiceService } from './catalog-service.service';
import { DatabaseModule } from 'y/database';

@Module({
  imports: [DatabaseModule],
  controllers: [CatalogServiceController],
  providers: [CatalogServiceService],
})
export class CatalogServiceModule {}
