import { Injectable } from '@nestjs/common';

@Injectable()
export class VerifierAPIService {
  async getIssuerPubKey(holderPubKey: string): Promise<string> {
    // TODO: Some block chain code snippet
    // Holder Pub Key로 Issuer Pub Key 가져오기
    const issuerPubKey = 'Issuer Pub Key';
    return issuerPubKey;
  }

  verifyProof(issuerPubKey: string, proof: string): boolean {
    // TODO: Some block chain code snippet
    // ZKP 검증
    return true;
  }

  async loadProofResult(holderPubKey: string) {
    // TODO: Some block chain code snippet
    // { Holder Pub Key, True }
    return;
  }
}
