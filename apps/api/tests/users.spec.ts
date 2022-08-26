import { usersFindByIdTest } from './suites/users/queries/usersFindById.test';
import { usersFindOrCreateTest } from './suites/users/mutations/usersFindOrCreate.test';

describe('Users', () => {
  describe('Queries', () => {
    usersFindByIdTest();
  });

  describe('Mutations', () => {
    usersFindOrCreateTest();
  });
});
