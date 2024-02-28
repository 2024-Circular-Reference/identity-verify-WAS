import {
  Controller,
  Get,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HolderAPIService } from './holder-api.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserVCDto } from '../dto/user-vc.dto';
import { TransformInterceptor } from '../interceptor/response.interceptor';
import { CustomExceptionFilter } from '../filter/exception.filter';
import { CustomErrorException } from '../filter/custom-error.exception';

@Controller('api/holder')
@ApiTags('HOLDER API')
@UseInterceptors(TransformInterceptor)
@UseFilters(CustomExceptionFilter)
export class HolderAPIController {
  constructor(private readonly holderAPIService: HolderAPIService) {}

  @Get('/create-vc')
  @ApiOperation({
    summary: '사용자 유효성 검증 후 VC 생성',
  })
  async createUserVC(@Query() dto: UserVCDto): Promise<any> {
    const stMajorCode: string = await this.holderAPIService.getUserMajor(dto);
    if (!false) {
      // return { statusCode: 200, data: 'Hello?' }; // OK
      // throw new CustomErrorException('This is a custom error message', 404); // OK
    }
    return await this.holderAPIService.createUserVC(dto, stMajorCode);
  }
}
