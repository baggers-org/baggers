import { portfoliosAddHoldingTest } from './suites/portfolios/mutations/portfoliosAddHolding.test';
import { portfoliosBeginImportTests } from './suites/portfolios/mutations/portfoliosBeginImport.test';
import { portfoliosInitEmptyTests } from './suites/portfolios/mutations/portfoliosInitEmpty.test';
import { portfoliosRemoveMultipleTests } from './suites/portfolios/mutations/portfoliosRemoveMultiple.test';
import { portfoliosRemoveOneTests } from './suites/portfolios/mutations/portfoliosRemoveOne.test';
import { portfoliosUpdateOneTests } from './suites/portfolios/mutations/portfoliosUpdateOne.test';
import { portfoliosCreatedTests } from './suites/portfolios/queries/portfoliosCreated.test';
import { portfoliosFindByIdTests } from './suites/portfolios/queries/portfoliosFindById.test';

describe('Portfolio', () => {
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
});
