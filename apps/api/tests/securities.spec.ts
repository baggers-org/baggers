import { securitiesFindByIdTest } from './suites/securities/queries/securitiesFindById.test';

jest.mock('@baggers/env', () => ({
  setupEnv: () => ({}),
}));
describe('Securities', () => {
  describe('Queries', () => {
    securitiesFindByIdTest();
  });
});
