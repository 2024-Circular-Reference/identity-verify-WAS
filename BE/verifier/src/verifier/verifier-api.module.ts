import { Module } from '@nestjs/common';
import { VerifierAPIController } from './verifier-api.controller';
import { VerifierAPIService } from './verifier-api.service';

@Module({
  imports: [],
  controllers: [VerifierAPIController],
  providers: [VerifierAPIService],
})
export class VerifierAPIModule {}
