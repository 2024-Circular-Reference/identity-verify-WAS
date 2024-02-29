import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';
import { ServiceAPIService } from './service-api.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProofDto } from '../dto/proof.dto';
import { UserVCDto } from '../dto/user-vc.dto';
import { CustomExceptionFilter } from '../filter/exception.filter';
import { CustomErrorException } from '../filter/custom-error.exception';

@Controller('api/service')
@ApiTags('SERVICE API')
@UseFilters(CustomExceptionFilter)
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
    try {
      const { uuid, vc } = dto;
      return await this.serviceAPIService.saveUserVC(uuid, vc);
    } catch (error) {
      throw new CustomErrorException('VC Save Failed', 500);
    }
  }

  //! Init API
  @Post('init-mock')
  @ApiOperation({
    summary: 'student 테이블의 데이터 mocking',
  })
  async initMock() {
    try {
      return await this.serviceAPIService.initMock();
    } catch (error) {
      throw new CustomErrorException('Init Mock Failed', 500);
    }
  }
}
