import getPositionsSort from '../Positions/getPositionsSort';
import { PossibleSortOptions } from '../Positions/getPositions';

describe(`getMyPositionsSort`, () => {
  it(`should take input in the form SORT_KEY_VARIABLE_LENGTH_ASC or SORT_KEY_VARIABLE_LENGTH_DESC and produce mongodb sort operations`, () => {
    const results: Array<{ $sort: { [key: string]: number } }> = [];
    PossibleSortOptions.forEach((option) => {
      results.push(getPositionsSort(option));
    });

    expect(results).toMatchInlineSnapshot(`
      Array [
        Object {
          "$sort": Object {
            "costBasis": 1,
          },
        },
        Object {
          "$sort": Object {
            "costBasis": -1,
          },
        },
        Object {
          "$sort": Object {
            "marketValue": 1,
          },
        },
        Object {
          "$sort": Object {
            "marketValue": -1,
          },
        },
        Object {
          "$sort": Object {
            "profitLossUsd": 1,
          },
        },
        Object {
          "$sort": Object {
            "profitLossUsd": -1,
          },
        },
        Object {
          "$sort": Object {
            "symbol.symbol": 1,
          },
        },
        Object {
          "$sort": Object {
            "symbol.symbol": -1,
          },
        },
        Object {
          "$sort": Object {
            "symbol.securityName": 1,
          },
        },
        Object {
          "$sort": Object {
            "symbol.securityName": -1,
          },
        },
        Object {
          "$sort": Object {
            "symbol.quote.change": 1,
          },
        },
        Object {
          "$sort": Object {
            "symbol.quote.change": -1,
          },
        },
        Object {
          "$sort": Object {
            "symbol.quote.changePercent": 1,
          },
        },
        Object {
          "$sort": Object {
            "symbol.quote.changePercent": -1,
          },
        },
        Object {
          "$sort": Object {
            "symbol.quote.latestPrice": 1,
          },
        },
        Object {
          "$sort": Object {
            "symbol.quote.latestPrice": -1,
          },
        },
        Object {
          "$sort": Object {
            "symbol.quote.volume": 1,
          },
        },
        Object {
          "$sort": Object {
            "symbol.quote.volume": -1,
          },
        },
      ]
    `);
  });
});
