import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { HolderAppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let holderApp: INestApplication;

  beforeEach(async () => {
    const holderModuleFixture: TestingModule = await Test.createTestingModule({
      imports: [HolderAppModule],
    }).compile();

    holderApp = holderModuleFixture.createNestApplication();

    await holderApp.init();
  });

  it('success test', () => {
    return undefined;
  });

  afterAll(async () => {
    await holderApp.close();
  });
});
