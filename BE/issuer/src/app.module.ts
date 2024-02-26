import { Module } from '@nestjs/common';
import { IssuerAPIModule } from './issuer/issuer-api.module';

@Module({
  imports: [IssuerAPIModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
