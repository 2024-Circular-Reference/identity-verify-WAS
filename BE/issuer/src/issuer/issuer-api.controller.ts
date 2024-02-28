import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { IssuerAPIService } from './issuer-api.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserVCDto } from '../dto/user-vc.dto';
import { CustomExceptionFilter } from '../filter/exception.filter';
import { CustomErrorException } from '../filter/custom-error.exception';

@Controller('api/issuer')
@ApiTags('Issuer API')
@UseFilters(CustomExceptionFilter)
export class IssuerAPIController {
  constructor(private readonly issuerAPIService: IssuerAPIService) {}

  // Holder에서 호출
  @Get('/create-vc')
  @ApiOperation({
    summary: '사용자 VC 생성 후 블록체인에 키체인 적재',
  })
  async createUserVC(@Query() dto: UserVCDto) {
    const { uuid, vc } = this.issuerAPIService.createUserVC(dto);
    const vcString = JSON.stringify(vc);
    try {
      // DB에 VC 저장
      await this.issuerAPIService.saveUserVC(uuid, vcString);
    } catch (error) {
      throw new CustomErrorException('VC Save Failed', 500);
    }
    try {
      // 블록체인에 키 체인 적재
      await this.issuerAPIService.loadKeyChain(vcString);
    } catch (error) {
      throw new CustomErrorException('Block Chain Load Failed', 500);
    }
    const issuerPubKey = await this.issuerAPIService.getIssuerPubKey();
    return { issuerPubKey, vc };
  }
}
