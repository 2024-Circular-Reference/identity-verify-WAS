import { Module } from '@nestjs/common';
import { ServiceAPIModule } from './service/service-api.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ServiceAPIModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'test'
          ? './src/config/.test.env'
          : './src/config/.launch.env',
    }),
  ],
  controllers: [],
  providers: [],
})
export class ServiceAppModule {}
