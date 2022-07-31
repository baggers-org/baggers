import { portfoliosInitEmptyTests } from './suites/portfolios/mutations/portfoliosInitEmpty.test';
import { portfoliosRemoveMultipleTests } from './suites/portfolios/mutations/portfoliosRemoveMultiple.test';
import { portfoliosCreatedTests } from './suites/portfolios/queries/portfoliosCreated.test';
import { portfoliosFindByIdTests } from './suites/portfolios/queries/portfoliosFindById.test';

describe('Portfolio', () => {
  describe('Queries', () => {
    portfoliosFindByIdTests();
    portfoliosCreatedTests();
  });

  describe('Mutations', () => {
    portfoliosInitEmptyTests();
    portfoliosRemoveMultipleTests();
  });
});
