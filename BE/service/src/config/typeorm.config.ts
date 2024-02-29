import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { HolderVCEntity } from '../entity/holder_vc.entity';
import { ConfigService } from '@nestjs/config';
import { StudentEntity } from 'src/entity/student.entity';

export const TypeormConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PWD'),
  database: 'db',
  entities: [HolderVCEntity, StudentEntity],
  synchronize: true,
  logging: true,
});
