import { Controller, Get, Query } from '@nestjs/common';
import { IssuerAPIService } from './issuer-api.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserVCDto } from './user-vc.dto';

@Controller('api/issuer')
@ApiTags('Issuer API')
export class IssuerAPIController {
  constructor(private readonly issuerAPIService: IssuerAPIService) {}

  @Get('/create-vc')
  @ApiOperation({
    summary: '사용자 VC 생성 후 블록체인에 키체인 적재',
  })
  async createUserVC(@Query() dto: UserVCDto): Promise<any> {
    const { stMajorCode, holderPubKey } = dto;
    const vc = await this.issuerAPIService.createUserVC(
      stMajorCode,
      holderPubKey,
    );
    const isLoadSuccess = await this.issuerAPIService.loadKeyChain(vc);
    if (!isLoadSuccess) {
      return 'Block Chain Load Failed';
    }
    const issuerPubKey = await this.issuerAPIService.getIssuerPubKey();
    return { issuerPubKey, vc };
  }
}
