import { Module } from '@nestjs/common';
import { ServiceAPIController } from './service-api.controller';
import { ServiceAPIService } from './service-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ServiceAPIController],
  providers: [ServiceAPIService],
})
export class ServiceAPIModule {}
