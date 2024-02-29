import { Module } from '@nestjs/common';
import { ServiceAPIController } from './service-api.controller';
import { ServiceAPIService } from './service-api.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HolderVCEntity } from '../entity/holder_vc.entity';
import { StudentEntity } from 'src/entity/student.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([HolderVCEntity, StudentEntity]),
  ],
  controllers: [ServiceAPIController],
  providers: [ServiceAPIService],
})
export class ServiceAPIModule {}
