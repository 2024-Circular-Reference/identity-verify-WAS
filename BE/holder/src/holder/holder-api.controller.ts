import { Controller, Get, Query } from '@nestjs/common';
import { HolderAPIService } from './holder-api.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserVCDto } from '../dto/user-vc.dto';

@Controller('api/holder')
@ApiTags('HOLDER API')
export class HolderAPIController {
  constructor(private readonly holderAPIService: HolderAPIService) {}

  @Get('/create-vc')
  @ApiOperation({
    summary: '사용자 유효성 검증 후 VC 생성',
  })
  async createUserVC(@Query() dto: UserVCDto): Promise<any> {
    const stMajorCode: string = await this.holderAPIService.getUserMajor(dto);
    if (!stMajorCode) {
      return 'User Not Exist';
    }
    return await this.holderAPIService.createUserVC(dto, stMajorCode);
  }
}
