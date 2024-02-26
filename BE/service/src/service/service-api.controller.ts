import { Controller, Get } from '@nestjs/common';
import { ServiceAPIService } from './service-api.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/service')
@ApiTags('SERVICE API')
export class ServiceAPIController {
  constructor(private readonly serviceAPIService: ServiceAPIService) {}

  @Get('near-credit')
  @ApiOperation({
    summary: '사용자 계정 생성시 Near Credit 요청에 대한 반환',
  })
  async serveNearCredit(): Promise<any> {
    return await this.serviceAPIService.serveNearCredit();
  }
}
