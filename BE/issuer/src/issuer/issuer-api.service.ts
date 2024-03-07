import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UserVCDto } from '../dto/user-vc.dto';
import { connectToNEARContract, createVC } from '../utils/utils';
import { NEARContract } from '../types/types';

@Injectable()
export class IssuerAPIService {
  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) { }

  createUserVC(dto: UserVCDto) {
    const { stMajorCode, holderPubKey } = dto;
    const uuid = uuidv4();
    const vc = createVC(uuid, stMajorCode, holderPubKey);
    return { uuid, vc };
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

  async loadKeyChain(vc: string) {
    const issuerPubKey = await this.getIssuerPubKey();
    const contract = await connectToNEARContract();

    // { Issuer Pub Key : Hash(VC) } 적재
    const hashVC = await bcrypt.hash(vc, 10);
    await (contract as NEARContract).load_hashed_vc({
      issuer_did: `did:near:${issuerPubKey}`,
      hashed_vc: hashVC,
    });

    // 제대로 적재 되었는지 확인
    const response = await (contract as NEARContract).get_hashed_vcs({
      issuer_did: `did:near:${issuerPubKey}`,
    });

    console.log(`[+] hashed VCs from issuer '${issuerPubKey}': ${response}`);
    return;
  }

  async getIssuerPubKey() {
    // TODO: DB에서 Issuer Pub Key 가져와서 반환
    return 'quixotic-debt.testnet';
  }
}
