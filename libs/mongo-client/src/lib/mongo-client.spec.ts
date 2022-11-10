import { mongoClient } from './mongo-client';

describe('mongoClient', () => {
  it('should work', () => {
    expect(mongoClient()).toEqual('mongo-client');
  });
});
