import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { ProofDto } from '../dto/proof.dto';
import { lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { HolderVCEntity } from '../entity/holder_vc.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceAPIService {
  constructor(
    @InjectRepository(HolderVCEntity)
    private holderVCRepository: Repository<HolderVCEntity>,
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async saveUserVC(uuid: string, vc: string) {
    await this.holderVCRepository.save({ did: uuid, vc });
    return;
  }

  // Verfier API 호출
  async verifyProof(dto: ProofDto): Promise<boolean> {
    const url = this.configService.get<string>('API_VERIFY_PROOF');
    return lastValueFrom(
      this.httpService
        .get(url, { params: { ...dto } })
        .pipe(map((response) => response.data)),
    );
  }
}
