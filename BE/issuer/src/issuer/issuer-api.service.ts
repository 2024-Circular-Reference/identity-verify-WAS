import { Injectable } from '@nestjs/common';
import { UserVCDto } from './user-vc.dto';

@Injectable()
export class IssuerAPIService {
  async createUserVC(dto: UserVCDto): Promise<any> {
    // TODO: Some block chain code snippet
    const vc = 'vc';
    return vc;
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
}
