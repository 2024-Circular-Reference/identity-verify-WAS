/* eslint-disable @typescript-eslint/no-var-requires */
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
import * as ed25519 from '@stablelib/ed25519';
const bs58 = require('bs58');

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

  async loadKeyChain(issuerPubKey: string, vc: string) {
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

  generateProofValue() {
    //! Key는 일단 env 파일로 관리
    // Issuer Key Pair 생성
    // => Public Key: 32자리 base58 / Private Key: 64자리 base58
    // const { publicKey, secretKey } = ed25519.generateKeyPair();

    // VC sign 목적 proofValue 생성
    // Private Key로 msg를 sign함
    // => Proof Value: 64자리 base58
    const message = `pnu_${uuidv4()}`;
    return bs58.encode(
      ed25519.sign(
        bs58.decode(this.configService.get<string>('ISSUER_PRI_KEY')),
        Buffer.from(message),
      ),
    );
  }

  verifyProofValue(message: string, proofValue: string): boolean {
    // proofValue에 대해 Public Key로 verify
    return ed25519.verify(
      bs58.decode(this.configService.get<string>('ISSUER_PUB_KEY')),
      Buffer.from(message),
      bs58.decode(proofValue),
    );
  }

  async getIssuerPubKey() {
    // TODO: DB에서 Issuer Pub Key 가져와서 반환
    return 'quixotic-debt.testnet';
  }
}
