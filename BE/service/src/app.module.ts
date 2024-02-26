import { Module } from '@nestjs/common';
import { ServiceAPIModule } from './service/service-api.module';

@Module({
  imports: [ServiceAPIModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
