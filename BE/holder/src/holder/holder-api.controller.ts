import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { HolderAPIService } from './holder-api.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserVCDto } from '../dto/user-vc.dto';
import { CustomExceptionFilter } from '../filter/exception.filter';
import { CustomErrorException } from '../filter/custom-error.exception';

@Controller('api/holder')
@ApiTags('HOLDER API')
@UseFilters(CustomExceptionFilter)
export class HolderAPIController {
  constructor(private readonly holderAPIService: HolderAPIService) {}

  @Get('/create-vc')
  @ApiOperation({
    summary: '사용자 유효성 검증 후 VC 생성',
  })
  async createUserVC(@Query() dto: UserVCDto) {
    const stMajorCode: string = await this.holderAPIService.getUserMajor(dto);
    if (!stMajorCode) {
      throw new CustomErrorException('User Not Exist', 404);
    }
    const response = await this.holderAPIService.createUserVC(dto, stMajorCode);
    return { statusCode: 200, data: response };
  }
}
