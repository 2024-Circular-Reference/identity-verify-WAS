import { Module } from '@nestjs/common';
import { IssuerAPIController } from './issuer-api.controller';
import { IssuerAPIService } from './issuer-api.service';

@Module({
  imports: [],
  controllers: [IssuerAPIController],
  providers: [IssuerAPIService],
})
export class IssuerAPIModule {}
