import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HolderAPIController } from './holder-api.controller';
import { HolderAPIService } from './holder-api.service';

@Module({
  imports: [HttpModule],
  controllers: [HolderAPIController],
  providers: [HolderAPIService],
})
export class HolderAPIModule {}
