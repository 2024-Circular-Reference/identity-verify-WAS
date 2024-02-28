import { Controller, Get, Query } from '@nestjs/common';
import { IssuerAPIService } from './issuer-api.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserVCDto } from './user-vc.dto';

@Controller('api/issuer')
@ApiTags('Issuer API')
export class IssuerAPIController {
  constructor(private readonly issuerAPIService: IssuerAPIService) {}

  // Holder에서 호출
  @Get('/create-vc')
  @ApiOperation({
    summary: '사용자 VC 생성 후 블록체인에 키체인 적재',
  })
  async createUserVC(@Query() dto: UserVCDto): Promise<any> {
    const { uuid, vc } = this.issuerAPIService.createUserVC(dto);
    const vcString = JSON.stringify(vc);
    // DB에 VC 저장
    await this.issuerAPIService.saveUserVC(uuid, vcString);
    // 블록체인에 키 체인 적재
    const isLoadSuccess = await this.issuerAPIService.loadKeyChain(vcString);
    if (!isLoadSuccess) {
      return 'Block Chain Load Failed';
    }
    const issuerPubKey = await this.issuerAPIService.getIssuerPubKey();
    return { issuerPubKey, vc };
  }
}
