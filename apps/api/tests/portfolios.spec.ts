import { setupTestApp } from './jest/setup';
import {
  portfoliosCreatedTests,
  portfoliosFindByIdTests,
  portfoliosInitEmptyTests,
  portfoliosRemoveMultipleTests,
  portfoliosRemoveOneTests,
  portfoliosUpdateOneTests,
} from './suites/portfolios';

describe('Portfolio', () => {
  beforeAll(async () => {
    await setupTestApp();
  });
  describe('Queries', () => {
    portfoliosFindByIdTests();
    portfoliosCreatedTests();
  });

  describe('Mutations', () => {
    portfoliosInitEmptyTests();
    portfoliosRemoveOneTests();
    portfoliosRemoveMultipleTests();
    portfoliosUpdateOneTests();
  });
});
