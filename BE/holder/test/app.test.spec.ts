import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { HolderAppModule } from '../src/app.module';
import { IssuerAppModule } from './../../issuer/src/app.module';

describe('AppController (e2e)', () => {
  let holderApp: INestApplication;
  let issuerApp: INestApplication;

  beforeEach(async () => {
    const holderModuleFixture: TestingModule = await Test.createTestingModule({
      imports: [HolderAppModule],
    }).compile();

    const issuerModuleFixture: TestingModule = await Test.createTestingModule({
      imports: [IssuerAppModule],
    }).compile();

    holderApp = holderModuleFixture.createNestApplication();
    issuerApp = issuerModuleFixture.createNestApplication();

    await holderApp.init();
    await issuerApp.init();
  });

  it('success test', () => {
    return undefined;
  });

  afterAll(async () => {
    await holderApp.close();
    await issuerApp.close();
  });
});
