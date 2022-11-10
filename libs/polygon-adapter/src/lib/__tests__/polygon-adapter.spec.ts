import { PolygonAdapter } from '../polygon-adapter';
import { PolygonMockClient } from '../mock-client';

describe('polygonAdapter', () => {
  describe('batchGetSecurityDetails', () => {
    it('should not result in duplicate securities', async () => {
      const adapter = new PolygonAdapter(PolygonMockClient);

      const results = await adapter.batchGetSecurityDetails(
        ['TSLA', 'ONDS', 'ABNB'],
        1
      );

      expect(results).toHaveLength(3);

      expect(results.map((r) => r._id)).toMatchInlineSnapshot(`
        Array [
          "TSLA",
          "ONDS",
          "ABNB",
        ]
      `);
    });

    it('should handle batches that are larger than the input size', async () => {
      const adapter = new PolygonAdapter(PolygonMockClient);

      const results = await adapter.batchGetSecurityDetails(
        ['TSLA', 'ONDS', 'ABNB'],
        1000
      );

      expect(results).toHaveLength(3);

      expect(results.map((r) => r._id)).toMatchInlineSnapshot(`
        Array [
          "TSLA",
          "ONDS",
          "ABNB",
        ]
      `);
    });
  });

  it('should handle a single entity', async () => {
    const adapter = new PolygonAdapter(PolygonMockClient);

    const results = await adapter.batchGetSecurityDetails(
      ['TSLA'],
      1
    );

    expect(results).toHaveLength(1);

    expect(results.map((r) => r._id)).toMatchInlineSnapshot(`
        Array [
          "TSLA",
        ]
      `);
  });

  it('should continue even with errors', async () => {
    const adapter = new PolygonAdapter({
      ...PolygonMockClient,
      reference: {
        ...PolygonMockClient.reference,
        tickerDetails() {
          throw Error('Not found');
        },
      },
    });

    const results = await adapter.batchGetSecurityDetails(
      ['TSLA'],
      1
    );

    expect(results).toHaveLength(0);
  });
});
