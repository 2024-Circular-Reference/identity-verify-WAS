import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { UserVCDto } from '../dto/user-vc.dto';

@Injectable()
export class HolderAPIService {
  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  // 사용자가 존재하는지 유효성 검증
  // TODO: Mock DB 생성 후 연결
  async getUserMajor(dto: UserVCDto): Promise<string> {
    const { stNum, stPwd } = dto;
    // params로 학생의 전공 코드를 DB에서 반환
    const majorCode = '245';
    return majorCode;
  }

  // Issuer 호출
  async createUserVC(dto: UserVCDto, stMajorCode: string) {
    const { holderPubKey } = dto;
    const url = this.configService.get<string>('API_CREATE_USER_VC');
    return lastValueFrom(
      this.httpService
        .get(url, { params: { stMajorCode, holderPubKey } })
        .pipe(map((response) => response.data)),
    );
  }
}
