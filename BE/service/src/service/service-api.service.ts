import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { ProofDto } from '../dto/proof.dto';
import { lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { HolderVCEntity } from '../entity/holder_vc.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from 'src/entity/student.entity';
import * as fs from 'fs/promises';
import * as path from 'path';
import { UserInfoDto } from 'src/dto/user-info.dto';

@Injectable()
export class ServiceAPIService {
  constructor(
    @InjectRepository(HolderVCEntity)
    private holderVCRepository: Repository<HolderVCEntity>,
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  // Verfier API 호출
  async verifyProof(dto: ProofDto): Promise<boolean> {
    const url = this.configService.get<string>('API_VERIFY_PROOF');
    return lastValueFrom(
      this.httpService
        .get(url, { params: { ...dto } })
        .pipe(map((response) => response.data)),
    );
  }

  async getUserMajor(dto: UserInfoDto): Promise<StudentEntity> {
    const { stNum, stPwd } = dto;
    return await this.studentRepository
      .createQueryBuilder('student')
      .where('student.number = :stNum', { stNum })
      .andWhere('student.password = :stPwd', { stPwd })
      .getOne();
  }

  async saveUserVC(uuid: string, vc: string) {
    await this.holderVCRepository.save({ did: uuid, vc });
    return;
  }

  // config 폴더의 mock data를 DB에 삽입
  async initMock() {
    const filePath = path.join(process.cwd(), './src/config/student.data.txt');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const lines = fileContent.split('\n');
    lines.map(async (line) => {
      const [number, password, major_code] = line.split(' ');
      await this.studentRepository.save({
        number,
        password,
        major_code,
      });
    });
  }
}
