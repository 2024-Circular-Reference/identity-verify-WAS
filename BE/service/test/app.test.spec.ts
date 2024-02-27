import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ServiceAppModule } from '../src/app.module';
import { VerifierAppModule } from './../../verifier/src/app.module';

describe('AppController (e2e)', () => {
  let serviceApp: INestApplication;
  let verifierApp: INestApplication;

  beforeEach(async () => {
    const serviceModuleFixture: TestingModule = await Test.createTestingModule({
      imports: [ServiceAppModule],
    }).compile();

    const verifierModuleFixture: TestingModule = await Test.createTestingModule(
      {
        imports: [VerifierAppModule],
      },
    ).compile();

    serviceApp = serviceModuleFixture.createNestApplication();
    verifierApp = verifierModuleFixture.createNestApplication();

    await serviceApp.init();
    await verifierApp.init();
  });

  it('verify-proof to Verifier (Success)', () => {
    const proofDto = {
      HolderPubKey: 'Test Holder Pub Key',
      proof: 'Test Proof',
    };

    return request(serviceApp.getHttpServer())
      .get('/api/service/verify-proof')
      .send(proofDto)
      .expect(200)
      .expect('true');
  });

  afterAll(async () => {
    await serviceApp.close();
    await verifierApp.close();
  });
});
