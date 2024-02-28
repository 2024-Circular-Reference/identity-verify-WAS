import { Injectable } from '@nestjs/common';
import { createVC } from 'src/utils/utils';
import { v4 as uuidv4 } from 'uuid';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { UserVCDto } from './user-vc.dto';

@Injectable()
export class IssuerAPIService {
  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  createUserVC(dto: UserVCDto) {
    const { stMajorCode, holderPubKey } = dto;
    const uuid = uuidv4();
    const vc = createVC(uuid, stMajorCode, holderPubKey);
    return { uuid, vc };
  }

  async loadKeyChain(vc: any): Promise<boolean> {
    const issuerPubKey = await this.getIssuerPubKey();
    // TODO: Some block chain code snippet
    // - { Issuer Pub Key, Hash(VC) }
    return true;
  }

  async getIssuerPubKey() {
    // TODO: DB에서 Issuer Pub Key 가져와서 반환
    return 'Issuer Pub Key';
  }

  // Service API 호출
  async saveUserVC(uuid: string, vc: string) {
    const url = this.configService.get<string>('API_SAVE_USER_VC');
    await lastValueFrom(
      this.httpService
        .post(url, { uuid, vc })
        .pipe(map((response) => response.data)),
    );
    return;
  }
}
