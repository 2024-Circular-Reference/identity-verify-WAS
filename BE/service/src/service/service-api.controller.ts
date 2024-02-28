import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ServiceAPIService } from './service-api.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProofDto } from '../dto/proof.dto';
import { UserVCDto } from '../dto/user-vc.dto';

@Controller('api/service')
@ApiTags('SERVICE API')
export class ServiceAPIController {
  constructor(private readonly serviceAPIService: ServiceAPIService) {}

  @Get('verify-proof')
  @ApiOperation({
    summary: '생성된 Proof를 검증하기 위해 Verifier 서버로 프록시',
  })
  async verifyProof(@Query() dto: ProofDto): Promise<boolean> {
    return await this.serviceAPIService.verifyProof(dto);
  }

  // Issuer에서 호출
  @Post('save-vc')
  @ApiOperation({
    summary: 'Issuer가 생성한 Holder VC를 DB에 저장',
  })
  async saveUserVC(@Body() dto: UserVCDto) {
    const { uuid, vc } = dto;
    return await this.serviceAPIService.saveUserVC(uuid, vc);
  }
}
