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
  async getUserMajor(dto: UserVCDto): Promise<string> {
    const { stNum, stPwd } = dto;
    // params로 학생의 전공 코드를 DB에서 반환
    const url = this.configService.get<string>('API_GET_USER_MAJOR');
    return lastValueFrom(
      this.httpService
        .get(url, { params: { stNum, stPwd } })
        .pipe(map((response) => response.data)),
    );
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

  // Issuer 호출
  async getProofValue() {
    // TODO: /generate-proof-value env에 추가
    const url = this.configService.get<string>('API_GET_PROOF_VALUE');
    return lastValueFrom(
      this.httpService
        .get(url)
        .pipe(map((response) => response.data)),
    );
  }

  // Issuer 호출
  async requestVerifyProof(dto: any) {
    // TODO: /verify-proof-value env에 추가
    const url = this.configService.get<string>('API_REQUEST_VERIFY');
    return lastValueFrom(
      this.httpService
        .get(url, { params: {message: dto?.message, proofValue: dto?.proofValue } })
        .pipe(map((response) => response.data)),
    );
  }
}
