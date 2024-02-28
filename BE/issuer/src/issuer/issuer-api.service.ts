import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class IssuerAPIService {
  async createUserVC(stMajorCode: string, holderPubKey: string): Promise<any> {
    // 인자로 받은 학번, 비밀번호, Holder Pub Key로 규격에 맞게 VC를 생성
    const uuid = uuidv4();
    const timeStamp = this.getTimeStamp();
    return {
      context: ['https://www.w3.org/ns/credentials/v2'],
      id: `url:uuid:${uuid}`,
      credential_type: ['VerifiableCredential', 'MajorCredential'],
      issuer: 'pnu.testnet',
      validFrom: timeStamp,
      credentialSubject: {
        id: `${holderPubKey}.testnet`,
        subject: {
          school_did: 'pnu.testnet',
          major: stMajorCode,
        },
      },
    };
  }

  async loadKeyChain(vc: any): Promise<boolean> {
    const issuerPubKey = await this.getIssuerPubKey();
    // TODO: Some block chain code snippet
    // - { Issuer Pub Key, Hash(VC) }
    return true;
  }

  async getIssuerPubKey() {
    return 'Issuer Pub Key';
  }

  getTimeStamp() {
    const now = new Date();

    const y = now.getFullYear();
    const m = ('0' + (now.getMonth() + 1)).slice(-2);
    const d = ('0' + now.getDate()).slice(-2);

    const h = ('0' + now.getHours()).slice(-2);
    const min = ('0' + now.getMinutes()).slice(-2);
    const sec = ('0' + now.getSeconds()).slice(-2);

    return `${y}-${m}-${d}T${h}:${min}:${sec}Z`;
  }
}
