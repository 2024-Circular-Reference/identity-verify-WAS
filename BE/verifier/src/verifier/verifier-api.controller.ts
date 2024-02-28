import { Controller, Get, Query } from '@nestjs/common';
import { VerifierAPIService } from './verifier-api.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProofDto } from '../dto/proof.dto';

@Controller('api/verifier')
@ApiTags('VERIFIER API')
export class VerifierAPIController {
  constructor(private readonly verifierAPIService: VerifierAPIService) {}

  @Get('verify-proof')
  @ApiOperation({
    summary: '생성된 Proof를 검증',
  })
  async verifyProof(@Query() dto: ProofDto): Promise<boolean> {
    const { holderPubKey, proof } = dto;
    const issuerPubKey = await this.verifierAPIService.getIssuerPubKey(
      holderPubKey,
    );
    const verifyResult = this.verifierAPIService.verifyProof(
      issuerPubKey,
      proof,
    );
    if (!verifyResult) return false;
    await this.verifierAPIService.loadProofResult(holderPubKey);
    return true;
  }
}
