import { securitiesFindByIdTest } from './suites/securities/queries/securitiesFindById.test';

describe('Securities', () => {
  describe('Queries', () => {
    securitiesFindByIdTest();
  });
});
