import { Controller, Get, Query, UseFilters, Post } from '@nestjs/common';
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
    summary: 'HOLDER 호출) 사용자 VC 생성 후 블록체인에 키체인 적재',
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

  /*
    @ Test Pub Key, Pri Key, Sign
    - Pub Key: 21H+4UnTBl4MiUi47Oi6OzFy+3yVocYWK8BSsvfFEKA=
    - Pri Key: ypHCLNpqOwa+leQot7Oz53giFGztZybfYtgQ0I62e87bUf7hSdMGXgyJSLjs6Lo7MXL7fJWhxhYrwFKy98UQoA==
    - Sign: 6I/1WOSXgNvZO6CydqTg5LCkzr5TEtvXuR5Ly1a+c/X+XGmHtfPcavJ2N5BZQA9uvaKk/+N0h9AVkaVvnTk/Ag==
    - Message: pnu_uuidv4
  */

  // TODO: Holder에서 호출
  @Post('/generate-proof-value')
  @ApiOperation({
    summary: 'base64 string[64] 형태 Proof Value 생성',
  })
  generateProofValue() {
    return this.issuerAPIService.generateProofValue();
  }

  // TODO: Holder에서 호출
  @Get('/verify-proof-value')
  @ApiOperation({
    summary: 'Proof Value 검증 후 boolean 반환',
  })
  verifyProofValue(
    @Query('message') message: string,
    @Query('proofValue') proofValue: string,
  ) {
    return this.issuerAPIService.verifyProofValue(message, proofValue);
  }
}
