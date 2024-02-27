import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
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

  it('create-vc to Issuer (Success)', () => {
    const userVCDto = {
      studentNumber: 'Test Student Number',
      studentPassword: 'Test Student Password',
      HolderPubKey: 'Test Holder Pub Key',
    };

    return request(holderApp.getHttpServer())
      .get('/api/holder/create-vc')
      .send(userVCDto)
      .expect(200)
      .expect('{"issuerPubKey":"Issuer Pub Key","vc":"vc"}');
  });

  afterAll(async () => {
    await holderApp.close();
    await issuerApp.close();
  });
});
