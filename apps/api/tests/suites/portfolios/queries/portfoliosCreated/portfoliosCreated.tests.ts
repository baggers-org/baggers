import { portfoliosCreated } from './portfoliosCreated.query';
export const portfoliosCreatedTests = () =>
  describe('portfoliosCreated', () => {
    describe('portfoliosCreated', () => {
      it('should return a PortfolioSummary for all the portfolios where you are the owner', async () => {
        const { data } = await portfoliosCreated().expectNoErrors();

        expect(data.portfoliosCreated).toHaveLength(2);
        expect(data.portfoliosCreated[1].top5Holdings).toMatchInlineSnapshot(`
          Array [
            Object {
              "costBasis": 389493,
              "exposure": 75.87245654125755,
              "marketValue": 3663350.7600000002,
            },
            Object {
              "costBasis": 84857293,
              "exposure": 23.9230425481903,
              "marketValue": 1155076.56,
            },
            Object {
              "costBasis": 3839,
              "exposure": 0.1533396453946191,
              "marketValue": 7403.7,
            },
            Object {
              "costBasis": 47942,
              "exposure": 0.02549343835058642,
              "marketValue": 1230.9,
            },
          ]
        `);

        // It should sort them by updatedAt - most recent
        expect(data.portfoliosCreated[0].updatedAt).toMatchInlineSnapshot(
          `"2022-12-12T00:00:00.000Z"`
        );
        expect(data.portfoliosCreated[1].updatedAt).toMatchInlineSnapshot(
          `"2022-07-22T00:00:00.000Z"`
        );

        expect(
          new Date(data.portfoliosCreated[0].updatedAt) >
            new Date(data.portfoliosCreated[1].updatedAt)
        );
      });
    });
  });
