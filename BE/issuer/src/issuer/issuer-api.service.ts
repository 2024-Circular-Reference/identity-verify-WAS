import { Injectable } from '@nestjs/common';
import { createVC } from 'src/utils/utils';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class IssuerAPIService {
  async createUserVC(stMajorCode: string, holderPubKey: string): Promise<any> {
    const uuid = uuidv4();
    const vc = createVC(uuid, stMajorCode, holderPubKey);
    // TODO: uuid를 pk로 DB에 VC를 저장
    return vc;
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
}
