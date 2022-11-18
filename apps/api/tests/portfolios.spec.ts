import { INestApplication } from '@nestjs/common';
import { portfoliosAddHoldingTest } from './suites/portfolios/mutations/portfoliosAddHolding.test';
import { portfoliosBeginImportTests } from './suites/portfolios/mutations/portfoliosBeginImport.test';
import { portfoliosInitEmptyTests } from './suites/portfolios/mutations/portfoliosInitEmpty.test';
import { portfoliosRemoveMultipleTests } from './suites/portfolios/mutations/portfoliosRemoveMultiple.test';
import { portfoliosRemoveOneTests } from './suites/portfolios/mutations/portfoliosRemoveOne.test';
import { portfoliosUpdateOneTests } from './suites/portfolios/mutations/portfoliosUpdateOne.test';
import { portfoliosCreatedTests } from './suites/portfolios/queries/portfoliosCreated.test';
import { portfoliosFindByIdTests } from './suites/portfolios/queries/portfoliosFindById.test';
import { setupTestApp } from './util/db-util';

describe('Portfolio', () => {
  let app: INestApplication;
  beforeAll(async () => {
    app = await setupTestApp();
  });
  describe('Queries', () => {
    portfoliosFindByIdTests();
    portfoliosCreatedTests();
  });

  describe('Mutations', () => {
    portfoliosBeginImportTests();
    portfoliosInitEmptyTests();
    portfoliosRemoveOneTests();
    portfoliosRemoveMultipleTests();
    portfoliosUpdateOneTests();
    portfoliosAddHoldingTest();
  });

  afterAll(async () => {
    await app.close();
  });
});
