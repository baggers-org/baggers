import { batchRequest } from './batch-request';

describe('batchRequest', () => {
  it('should work', () => {
    expect(batchRequest()).toEqual('batch-request');
  });
});
