import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { VerifierAPIService } from './verifier-api.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProofDto } from '../dto/proof.dto';
import { CustomExceptionFilter } from '../filter/exception.filter';
import { CustomErrorException } from '../filter/custom-error.exception';

@Controller('api/verifier')
@ApiTags('VERIFIER API')
@UseFilters(CustomExceptionFilter)
export class VerifierAPIController {
  constructor(private readonly verifierAPIService: VerifierAPIService) {}

  @Get('verify-proof')
  @ApiOperation({
    summary: '생성된 Proof를 검증',
  })
  async verifyProof(@Query() dto: ProofDto): Promise<boolean> {
    const { HolderPubKey, proof, IssuerPubKey, majorCode, metadata } = dto;
    const verifyResult = this.verifierAPIService.verifyProof(
      proof,
      IssuerPubKey,
      majorCode,
      metadata.params,
      metadata.vkey,
      metadata.strategy,
    );
    if (!verifyResult) return false;
    try {
      await this.verifierAPIService.loadProofResult(HolderPubKey);
      return true;
    } catch (error) {
      throw new CustomErrorException('Verfiy Load Failed', 502);
    }
  }
}
