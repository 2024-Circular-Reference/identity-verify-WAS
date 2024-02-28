import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class HolderAPIService {
  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  // 사용자가 존재하는지 유효성 검증
  // TODO: Mock DB 생성 후 연결
  async getUserMajor(stNum: string, stPwd: string): Promise<string> {
    // params로 학생의 전공 코드를 DB에서 반환
    const majorCode = '245';
    return majorCode;
  }

  async createUserVC(stMajorCode: string, holderPubKey: string): Promise<any> {
    const url = this.configService.get<string>('API_CREATE_USER_VC');
    return lastValueFrom(
      this.httpService
        .get(url, { params: { stMajorCode, holderPubKey } })
        .pipe(map((response) => response.data)),
    );
  }
}
