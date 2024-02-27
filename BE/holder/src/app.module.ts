import { Module } from '@nestjs/common';
import { HolderAPIModule } from './holder/holder-api.module';

@Module({
  imports: [HolderAPIModule],
  controllers: [],
  providers: [],
})
export class HolderAppModule {}
