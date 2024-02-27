import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { UserVCDto } from './user-vc.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class HolderAPIService {
  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  // 사용자가 존재하는지 유효성 검증
  // TODO: Mock DB 생성 후 연결
  async isUserExist(dto: UserVCDto): Promise<boolean> {
    return true;
  }

  async createUserVC(dto: UserVCDto): Promise<any> {
    const url = this.configService.get<string>('API_CREATE_USER_VC');
    return lastValueFrom(
      this.httpService
        .get(url, { params: { ...dto } })
        .pipe(map((response) => response.data)),
    );
  }
}
