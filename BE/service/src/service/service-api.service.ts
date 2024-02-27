import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { ProofDto } from './proof.dto';
import { lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ServiceAPIService {
  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async verifyProof(dto: ProofDto): Promise<boolean> {
    const url = this.configService.get<string>('API_VERIFY_PROOF');
    return lastValueFrom(
      this.httpService
        .get(url, { params: { ...dto } })
        .pipe(map((response) => response.data)),
    );
  }
}
