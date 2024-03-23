import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { StudentEntity } from '../entity/student.entity';

const configService: ConfigService = new ConfigService();

export default new DataSource({
  migrationsTableName: 'migrations',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1111',
  database: 'db',
  // synchronize: true,
  entities: [StudentEntity],
  migrations: ['src/migrations/*.ts'],
  charset: 'utf8mb4_unicode_ci',
  synchronize: false,
});
