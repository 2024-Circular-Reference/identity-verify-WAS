import { Module } from '@nestjs/common';
import { VerifierAPIModule } from './verifier/verifier-api.module';

@Module({
  imports: [VerifierAPIModule],
  controllers: [],
  providers: [],
})
export class VerifierAppModule {}
