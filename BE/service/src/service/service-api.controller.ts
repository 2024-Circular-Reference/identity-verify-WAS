import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';
import { ServiceAPIService } from './service-api.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProofDto } from '../dto/proof.dto';
import { UserVCDto } from '../dto/user-vc.dto';
import { CustomExceptionFilter } from '../filter/exception.filter';
import { CustomErrorException } from '../filter/custom-error.exception';
import { UserInfoDto } from 'src/dto/user-info.dto';

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

  // Holder에서 호출
  @Get('get-major')
  @ApiOperation({
    summary: 'HOLDER 호출) 학생 정보로 전공 코드를 반환',
  })
  async getUserMajor(@Query() dto: UserInfoDto): Promise<string> {
    const res = await this.serviceAPIService.getUserMajor(dto);
    if (!res) {
      return '';
    }
    return res.major_code;
  }

  //! Init API
  @Post('init-mock')
  @ApiOperation({
    summary: 'INIT 주의) student 테이블의 데이터 mocking',
  })
  async initMock() {
    try {
      return await this.serviceAPIService.initMock();
    } catch (error) {
      throw new CustomErrorException('Init Mock Failed', 500);
    }
  }
}
