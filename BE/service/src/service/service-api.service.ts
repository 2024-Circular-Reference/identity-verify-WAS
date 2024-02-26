import { Injectable } from '@nestjs/common';
import { ProofDto } from './proof.dto';
import { lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ServiceAPIService {
  constructor(private httpService: HttpService) {}

  async serveNearCredit(): Promise<any> {
    const response = await this.getCreditToNear();
    return response;
  }

  async getCreditToNear(): Promise<any> {
    // TODO: Some block chain code snippet
    return 'some credit';
  }

  async verifyProof(dto: ProofDto): Promise<boolean> {
    const url = 'http://issuer:8083/api/verifier/verify-proof';
    return lastValueFrom(
      this.httpService
        .get(url, { params: { ...dto } })
        .pipe(map((response) => response.data)),
    );
  }
}
