import * as stocks from '@polygon.io/client-js/lib/rest/stocks';
import * as websocketClient from '@polygon.io/client-js/lib/websockets';

// TODO: move this all to polygon mock or something
jest.spyOn(websocketClient, 'websocketClient').mockImplementation(
  () =>
    ({
      stocks() {
        return {
          addEventListener: jest.fn(),
        };
      },
    } as any)
);
const stocksClientMock = jest.spyOn(stocks, 'stocksClient');

export const mockPolygonStocksClientMethod = (method: any) => {
  stocksClientMock.mockImplementationOnce(() => ({
    aggregates: jest.fn(),
    aggregatesGroupedDaily: jest.fn(),
    dailyOpenClose: jest.fn(),
    lastQuote: jest.fn(),
    lastTrade: jest.fn(),
    previousClose: jest.fn(),
    quotes: jest.fn(),
    snapshotGainersLosers: jest.fn(),
    snapshotTicker: jest.fn(),
    trades: jest.fn(),
    ...method,
  }));
};
